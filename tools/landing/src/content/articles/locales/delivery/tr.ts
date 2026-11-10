import type { DeliveryCopy } from '../../delivery.ts';
export const copy: DeliveryCopy = {
  title: 'Projenizin şartnamesi hazır. Bu hafta neyi bitireceksiniz?',
  description: 'Şartnameyi haftalık bir taahhüde dönüştürün: kullanıcı sonucunu seçin, zaman ayırın ve sonraki karardan önce kanıtları inceleyin.',
  promoTitle: 'Başarıyı tanımlayın. Sonra ona yer açın.',
  promoBody: 'SpecScore projenizin ne zaman tamamlandığını tanımlar. Haftalık taahhüt, sıradaki adımı seçmenize yardımcı olur. İkisini kısa bir kanıt değerlendirmesiyle birleştirin.',
  readArticle: 'Bitireceğiniz bir sonraki sonucu seçin', explore: 'CommittedMe’yi tanıyın (İngilizce)', breadcrumb: 'Makaleler',
  relatedTitle: 'Sonucu doğrulanabilir kılın', relatedLink: 'Doğrulanabilir kabul kriterleri yazmak',
  intro: 'Şartname tamamlanmış olsa da proje yerinde sayabilir. Gereksinimler açıktır, ajanın bir planı vardır ve iş listesi büyür. Eksik olan daha küçük bir karar olabilir: Bu hafta hangi yararlı sonucu bitireceksiniz ve ona yer açmak için neyi bırakacaksınız? Bu değerlendirmeyi bir meslektaş, mentor veya not defteriyle yapabilirsiniz.',
  sections: [
    { title: 'Görev yığını değil, kullanıcı için bir sonuç seçin', paragraphs: [
      'Bir kabul kriterini kısa bir gösterime dönüştürün. CSV içe aktarma için “ayrıştırıcıyı uygulamak” işi anlatır. “Kullanıcı geçerli dosyayı içe aktarır, kayıtları görür ve geçersiz satır için yararlı bir hata alır” ise incelenebilir bir sonuçtur. Hata yolunu koruyun: Tarihe yetişmek için onu kaldırmak verdiğiniz sözü değiştirir.',
      'SpecScore, gereksinimlerle kabul kriterlerini ekibinizin ve ajanlarınızın okuyabileceği dosyalarda düzenler. Haftalık notunuzda bu kriterlere atıf yapın. Doğru davranışı şartname tanımlamaya devam eder; not, bunun yönetilebilir bir bölümünü seçer. Şartnamenin ikinci bir kopyasına veya yeni bir proje yönetim sistemine gerek yoktur.'
    ] },
    { title: 'Gerçek takviminize göre planlayın', paragraphs: [
      'İnceleme ve entegrasyon dahil gerçekten sahip olduğunuz odaklanmış çalışma sürelerini yazın. İki akşam, beş iş günü değildir. Tam kullanıcı yolculuğunu test etmek ve beklenmedik bir sorunu çözmek için zaman bırakın. Sonuç bu zamana sığmıyorsa başlamadan önce daha küçük, bütünlüklü bir yolculuk seçin.',
      'Kontrolünüz dışındaki bağımlılıkları listeleyin. “Üretim erişimi bekleniyor” için bir sorumlu ve karar zamanı gerekir. Çarşamba günü erişim hâlâ yoksa yerel bir gösterimin yararlı olup olmayacağına karar verin. Sonucu dürüstçe adlandırın: Yerel demo, üretime hazır olunduğunu kanıtlamaz. Cuma günü başarı tanımını sessizce değiştirmeyin.'
    ] },
    { title: 'Ajanların işini sınırlayın; kararı siz verin', paragraphs: [
      'Siz önemli problemin hangisi olduğuna karar verirken bir ajan birkaç uygulama üretebilir. Bu yüzden daha çok alt görevin tamamlanması asıl hedefi ilerletmeyebilir. Her göreve belirli bir kriter, izin verilen kapsam ve geri getirilecek kanıtlar verin. Tüm kullanıcı yolculuğunun kabulünden bir insan sorumlu kalsın.',
      'Yeni bir fikir geldiğinde otomatik olarak başlamadan kaydedin. Hangi mevcut taahhüdün yerini alacağını sorun. Son incelemenizi bekleyen yalnızca bir sonuç bulundurmayı deneyebilirsiniz. Bu, evrensel verimlilik kuralı değil, odaklanma deneyidir; yararlı işi yavaşlatıyorsa değiştirin.'
    ] },
    { title: 'Anlatıdan önce kanıtı inceleyin', paragraphs: [
      'Değerlendirmede önce gerçek çıktıyı açın: çalışan içe aktarma, geçersiz girdi testi veya yayımlanmış dokümantasyon. Kullanıcıyla aynı sırayı izleyin, ardından seçilen kriterle karşılaştırın. Commit sayıları, çalışma saatleri ve kendinden emin ajan özetleri bağlam sağlar; kabul kanıtı değildir.',
      'Uygulananı, test edileni ve hedef ortamda gerçekten kullanılabileni ayırın. İnceleyenden sonucun başarısız olabileceği bir yol bulmasını isteyin. Yalnızca gerekli bilgiyi paylaşın: Sentetik örnek veya hassas bilgileri çıkarılmış bir demo çoğu zaman yeterlidir. Taahhütlerin takibi müşteri verisi, sırlar veya özel depo paylaşmayı gerektirmez.'
    ] },
    { title: 'Tutulmayan bir söz yeni bir karar gerektirir', paragraphs: [
      'Gösterim başarısızsa en kısa yararlı açıklamayı yazın: bilinmeyen bağımlılık, fazla kapsam, bölünen çalışma süresi veya yanlış varsayım. Bir tahmin hatasını karakteriniz hakkında hükme dönüştürmeyin. Somut bir yanıt seçin: sonraki parçayı küçültmek, bağımlılığı çözmek, yaklaşımı değiştirmek ya da projeyi bilinçli olarak durdurmak.',
      'Aynı taahhüdü alışkanlıkla hiç değiştirmeden ileri taşımayın. Sonraki gözlemlenebilir sonuç ve inceleme tarihi üzerinde anlaşın. Birkaç döngüden sonra tahminlerle gerçekten tamamlanan işleri karşılaştırın. Kaydın amacı korumanız gereken bir başarı serisi değil, daha iyi kararlardır.'
    ] }
  ],
  reviewTitle: 'Bu beş satırlık haftalık değerlendirmeyi kopyalayın',
  reviewLines: ['Sonuç: kullanıcı inceleme tarihine kadar ne yapabilecek?', 'Kanıt: hangi kriter ve gösterim bunu doğrulayacak?', 'Zaman: ne zaman geliştirecek, test edecek ve inceleyeceğim?', 'Sınır: neyi erteliyorum ve hangi bağımlılık karar gerektiriyor?', 'İnceleme: sonucu kim, ne zaman görecek ve ardından hangi karar verilecek?'],
  ctaTitle: 'Kararlarınızı bir insanla değerlendirin',
  ctaBody: 'Bu notu, ne olduğunu soracak ve sonraki seçimi değerlendirmenize yardımcı olacak biriyle kullanın. CommittedMe, insan mentorluğu ve taahhütlerin takibine odaklanır. Geliştiriciler ve kurucular için sayfası bu yaklaşımı tanıtır. Şartname deponuzda kalsın; gizli çalışmaları açığa çıkarmadan konuşabileceğiniz bir hedef getirin.',
  mentorBody: "YouTube, TikTok, Instagram veya bir blogda geliştiricilere zaten bir şeyler öğretiyor musunuz? Tercihleri ve testleri anlatmak kendi varsayımlarınızı ortaya çıkarabilir. Başkalarının soruları, onlar ilerlerken sizin de öğrenmenize yardımcı olabilir. Bu tür konuşmalar ilginizi çekiyorsa mentor olmayı okuyun.",
  mentorLink: "Mentor olma hakkında okuyun (İngilizce)",
  disclosure: 'CommittedMe, ekosistemimizdeki başka bir üründür. Bu makale bir değerlendirme pratiği anlatır; SpecScore ile teknik entegrasyon olduğu anlamına gelmez.'
};
