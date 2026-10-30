// Command webcheck is the in-browser entry point for specscore spec lint.
// It is the specscore-cli lint package (pinned in go.mod), compiled to
// WASI so a page can run the same rules without uploading a spec.
package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/specscore/specscore-cli/pkg/lint"
)

// engineVersion matches the require in go.mod and SPECSCORE_VERSION in
// .github/workflows/dogfood.yml. Bump the three together.
const engineVersion = "v0.39.1"

func main() {
	if len(os.Args) > 1 && os.Args[1] == "--catalog" {
		writeJSON(map[string]any{
			"engine":  "specscore-cli",
			"version": engineVersion,
			"rules":   lint.AllRules(),
		})
		return
	}

	specRoot := "/work/spec"
	projectRoot := "/work"
	if len(os.Args) > 1 && os.Args[1] != "" {
		specRoot = os.Args[1]
	}
	if len(os.Args) > 2 && os.Args[2] != "" {
		projectRoot = os.Args[2]
	}

	res, err := lint.LintWithResult(lint.Options{
		SpecRoot:    specRoot,
		ProjectRoot: projectRoot,
	})
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err.Error())
		os.Exit(2)
	}
	violations := res.Violations
	if violations == nil {
		violations = []lint.Violation{}
	}
	writeJSON(map[string]any{
		"engine":     "specscore-cli",
		"version":    engineVersion,
		"violations": violations,
	})
}

func writeJSON(v any) {
	enc := json.NewEncoder(os.Stdout)
	if err := enc.Encode(v); err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err.Error())
		os.Exit(2)
	}
}
