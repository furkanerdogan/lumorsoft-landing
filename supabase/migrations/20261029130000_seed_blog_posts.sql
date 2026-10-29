-- Örnek (mock) blog yazıları: 3 yazı × 4 dil (tr, en, de, ar)
--
-- Tekrar çalıştırılabilir: aynı slug zaten varsa satır atlanır (on conflict do nothing).
-- Kaldırmak için:
--   delete from public.blog_posts where 'seed' = any(tags);

insert into public.blog_posts (translations, cover_image, tags, status, published_at)
values (
  $seed${
  "tr": {
    "slug": "web-siteniz-neden-musteri-getirmiyor",
    "category": "Web & SEO",
    "title": "Web Siteniz Neden Müşteri Getirmiyor? 6 Kontrol Noktası",
    "seo_title": "Web Siteniz Neden Müşteri Getirmiyor? 6 Kontrol Noktası",
    "seo_description": "Ziyaretçi geliyor ama telefon çalmıyor mu? Hız, mobil uyum, SEO ve net çağrı butonları dahil web sitenizi müşteri getiren bir araca çeviren 6 kontrol noktası.",
    "excerpt": "Ziyaretçi geliyor ama telefon çalmıyorsa sorun genelde tasarımda değil, birkaç temel noktada. İşte kendi sitenizde 15 dakikada yapabileceğiniz kontrol listesi.",
    "cover_alt": "Dizüstü bilgisayarda web sitesi trafik grafikleri",
    "content": "<p>Birçok işletme web sitesine yatırım yapıyor ama siteden gelen talep sayısı beklentinin çok altında kalıyor. Çoğu zaman sorun \"daha güzel bir tasarım\" değil; ziyaretçinin aradığını bulamaması ya da harekete geçmek için bir neden görmemesi.</p>\n<h2>1. Site 3 saniyede açılıyor mu?</h2>\n<p>Mobil ziyaretçilerin önemli bir kısmı yavaş açılan sayfayı beklemeden kapatır. Büyük görseller, gereksiz eklentiler ve ucuz paylaşımlı sunucular en sık sebeplerdir. Google PageSpeed Insights ile ücretsiz ölçebilirsiniz.</p>\n<h2>2. Telefonda rahat kullanılıyor mu?</h2>\n<p>Ziyaretlerin çoğu artık telefondan geliyor. Butonlar parmakla kolay tıklanabilmeli, yazılar yakınlaştırmadan okunabilmeli, formlar kısa olmalı.</p>\n<h2>3. İlk ekranda ne yaptığınız anlaşılıyor mu?</h2>\n<p>Ziyaretçi ilk birkaç saniyede şu üç soruya cevap bulmalı: Ne yapıyorsunuz? Kime yapıyorsunuz? Bir sonraki adım ne?</p>\n<h2>4. Net bir çağrı var mı?</h2>\n<p>\"Teklif alın\", \"Ücretsiz analiz isteyin\" ya da \"WhatsApp'tan yazın\" gibi tek ve belirgin bir eylem, birbirine rakip beş butondan daha iyi sonuç verir.</p>\n<h2>5. Google sizi buluyor mu?</h2>\n<ul>\n<li>Her sayfanın kendine ait başlığı ve açıklaması olmalı.</li>\n<li>Hizmetlerinizi müşterinin arayacağı kelimelerle anlatın.</li>\n<li>Google Business Profile ve Search Console hesaplarınızı kurun.</li>\n</ul>\n<h2>6. Güven veriyor mu?</h2>\n<p>Gerçek proje örnekleri, müşteri yorumları, açık iletişim bilgisi ve güncel içerik; ziyaretçinin \"bu firmaya yazayım\" demesini kolaylaştırır.</p>\n<p>Bu listedeki maddelerin çoğu küçük düzenlemelerle çözülebilir. Sitenizi birlikte değerlendirmek isterseniz <a href=\"/hizmetler/web-tasarim\">web tasarım hizmetimize</a> göz atabilir ya da ücretsiz analiz isteyebilirsiniz.</p>"
  },
  "en": {
    "slug": "why-your-website-isnt-bringing-customers",
    "category": "Web & SEO",
    "title": "Why Your Website Isn't Bringing Customers: 6 Checkpoints",
    "seo_title": "Why Your Website Isn't Bringing Customers: 6 Checkpoints",
    "seo_description": "Getting visitors but no enquiries? Six practical checkpoints — speed, mobile usability, SEO and clear calls to action — to turn your website into a lead generator.",
    "excerpt": "If people visit but nobody gets in touch, the problem is rarely the design. It's usually a few basics. Here's a checklist you can run on your own site in 15 minutes.",
    "cover_alt": "Website traffic charts on a laptop screen",
    "content": "<p>Many businesses invest in a website, yet the number of enquiries stays far below expectations. Most of the time the fix isn't \"a prettier design\" — it's that visitors can't find what they need or don't see a reason to act.</p>\n<h2>1. Does it load in under 3 seconds?</h2>\n<p>A large share of mobile visitors leave before a slow page finishes loading. Oversized images, unnecessary plugins and cheap shared hosting are the usual suspects. You can measure it for free with Google PageSpeed Insights.</p>\n<h2>2. Is it easy to use on a phone?</h2>\n<p>Most visits now come from phones. Buttons should be easy to tap, text readable without zooming, and forms short.</p>\n<h2>3. Is it clear what you do on the first screen?</h2>\n<p>Within a few seconds a visitor should be able to answer three questions: What do you do? Who is it for? What's the next step?</p>\n<h2>4. Is there one clear call to action?</h2>\n<p>A single, prominent action — \"Get a quote\", \"Request a free analysis\" or \"Message us on WhatsApp\" — works better than five competing buttons.</p>\n<h2>5. Can Google find you?</h2>\n<ul>\n<li>Every page needs its own title and description.</li>\n<li>Describe your services in the words customers actually search for.</li>\n<li>Set up Google Business Profile and Search Console.</li>\n</ul>\n<h2>6. Does it build trust?</h2>\n<p>Real project examples, client reviews, clear contact details and fresh content make it much easier for a visitor to decide to get in touch.</p>\n<p>Most items on this list can be fixed with small changes. If you'd like a second pair of eyes, take a look at our <a href=\"/en/services/web-design\">web design service</a> or request a free analysis.</p>"
  },
  "de": {
    "slug": "warum-ihre-website-keine-kunden-bringt",
    "category": "Web & SEO",
    "title": "Warum Ihre Website keine Kunden bringt: 6 Prüfpunkte",
    "seo_title": "Warum Ihre Website keine Kunden bringt: 6 Prüfpunkte",
    "seo_description": "Besucher, aber keine Anfragen? Sechs praktische Prüfpunkte — Ladezeit, Mobilfreundlichkeit, SEO und klare Handlungsaufforderungen — für mehr Kundenanfragen.",
    "excerpt": "Wenn Besucher kommen, aber niemand anfragt, liegt es selten am Design, sondern an ein paar Grundlagen. Diese Checkliste können Sie in 15 Minuten selbst durchgehen.",
    "cover_alt": "Website-Traffic-Diagramme auf einem Laptop",
    "content": "<p>Viele Unternehmen investieren in ihre Website, doch die Zahl der Anfragen bleibt weit hinter den Erwartungen. Meist hilft kein „schöneres Design“ — die Besucher finden schlicht nicht, was sie suchen, oder sehen keinen Grund, aktiv zu werden.</p>\n<h2>1. Lädt die Seite in unter 3 Sekunden?</h2>\n<p>Ein großer Teil der mobilen Besucher springt ab, bevor eine langsame Seite geladen ist. Zu große Bilder, unnötige Plugins und günstiges Shared Hosting sind die üblichen Ursachen. Mit Google PageSpeed Insights messen Sie das kostenlos.</p>\n<h2>2. Funktioniert sie gut auf dem Smartphone?</h2>\n<p>Die meisten Besuche kommen inzwischen vom Handy. Buttons müssen sich leicht antippen lassen, Texte ohne Zoomen lesbar und Formulare kurz sein.</p>\n<h2>3. Ist auf den ersten Blick klar, was Sie tun?</h2>\n<p>In wenigen Sekunden sollte ein Besucher drei Fragen beantworten können: Was machen Sie? Für wen? Was ist der nächste Schritt?</p>\n<h2>4. Gibt es eine klare Handlungsaufforderung?</h2>\n<p>Eine einzige, gut sichtbare Aktion — „Angebot anfordern“, „Kostenlose Analyse“ oder „Per WhatsApp schreiben“ — wirkt besser als fünf konkurrierende Buttons.</p>\n<h2>5. Findet Google Sie?</h2>\n<ul>\n<li>Jede Seite braucht einen eigenen Titel und eine eigene Beschreibung.</li>\n<li>Beschreiben Sie Ihre Leistungen mit den Begriffen, nach denen Kunden suchen.</li>\n<li>Richten Sie Google Business Profile und die Search Console ein.</li>\n</ul>\n<h2>6. Schafft sie Vertrauen?</h2>\n<p>Echte Projektbeispiele, Kundenbewertungen, klare Kontaktdaten und aktuelle Inhalte machen es Besuchern deutlich leichter, Kontakt aufzunehmen.</p>\n<p>Die meisten Punkte lassen sich mit kleinen Anpassungen lösen. Wenn Sie eine zweite Meinung möchten, sehen Sie sich unser <a href=\"/de/leistungen/webdesign\">Webdesign-Angebot</a> an oder fordern Sie eine kostenlose Analyse an.</p>"
  },
  "ar": {
    "slug": "why-your-website-isnt-bringing-customers",
    "category": "الويب وتحسين محركات البحث",
    "title": "لماذا لا يجلب موقعك عملاء؟ 6 نقاط للفحص",
    "seo_title": "لماذا لا يجلب موقعك الإلكتروني عملاء؟ 6 نقاط للفحص",
    "seo_description": "زوار بلا طلبات؟ ست نقاط عملية للفحص — السرعة، التوافق مع الجوال، تحسين محركات البحث، والدعوة الواضحة لاتخاذ إجراء — لتحويل موقعك إلى مصدر للعملاء.",
    "excerpt": "إذا كان الزوار يأتون ولا يتواصل أحد، فالمشكلة نادراً ما تكون في التصميم، بل في بعض الأساسيات. إليك قائمة فحص يمكنك تطبيقها على موقعك خلال 15 دقيقة.",
    "cover_alt": "رسوم بيانية لزيارات موقع على شاشة حاسوب محمول",
    "content": "<p>تستثمر شركات كثيرة في مواقعها الإلكترونية، لكن عدد الطلبات يبقى أقل بكثير من المتوقع. وفي أغلب الأحيان لا يكون الحل \"تصميماً أجمل\"، بل في أن الزائر لا يجد ما يبحث عنه أو لا يرى سبباً لاتخاذ خطوة.</p>\n<h2>1. هل يفتح الموقع في أقل من 3 ثوانٍ؟</h2>\n<p>جزء كبير من زوار الجوال يغادر قبل اكتمال تحميل الصفحة البطيئة. الصور الكبيرة والإضافات غير الضرورية والاستضافة المشتركة الرخيصة هي الأسباب الأكثر شيوعاً. يمكنك القياس مجاناً عبر Google PageSpeed Insights.</p>\n<h2>2. هل يسهل استخدامه على الهاتف؟</h2>\n<p>معظم الزيارات اليوم تأتي من الهواتف. يجب أن تكون الأزرار سهلة الضغط، والنصوص مقروءة دون تكبير، والنماذج قصيرة.</p>\n<h2>3. هل يتضح ما تقدمه من الشاشة الأولى؟</h2>\n<p>خلال ثوانٍ قليلة يجب أن يجد الزائر إجابة لثلاثة أسئلة: ماذا تقدم؟ لمن؟ وما الخطوة التالية؟</p>\n<h2>4. هل توجد دعوة واضحة لاتخاذ إجراء؟</h2>\n<p>إجراء واحد بارز مثل \"اطلب عرض سعر\" أو \"اطلب تحليلاً مجانياً\" أو \"راسلنا عبر واتساب\" يحقق نتائج أفضل من خمسة أزرار متنافسة.</p>\n<h2>5. هل يجدك Google؟</h2>\n<ul>\n<li>يجب أن يكون لكل صفحة عنوان ووصف خاص بها.</li>\n<li>صِف خدماتك بالكلمات التي يبحث بها عملاؤك فعلاً.</li>\n<li>أنشئ حسابي Google Business Profile وSearch Console.</li>\n</ul>\n<h2>6. هل يبني الثقة؟</h2>\n<p>نماذج المشاريع الحقيقية وآراء العملاء ومعلومات التواصل الواضحة والمحتوى المحدّث تجعل قرار التواصل أسهل بكثير على الزائر.</p>\n<p>يمكن حل معظم هذه النقاط بتعديلات بسيطة. إذا أردت رأياً ثانياً، اطّلع على <a href=\"/ar/services/web-design\">خدمة تصميم المواقع</a> لدينا أو اطلب تحليلاً مجانياً.</p>"
  }
}$seed$::jsonb,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
  array['web', 'seo', 'seed'],
  'published',
  '2026-10-20 09:00:00+03'
)
on conflict do nothing;

insert into public.blog_posts (translations, cover_image, tags, status, published_at)
values (
  $seed${
  "tr": {
    "slug": "erp-sisteminizi-degistirmeden-e-ticarete-baglamak",
    "category": "Entegrasyon",
    "title": "ERP'nizi Değiştirmeden E-Ticarete Bağlamak: Adım Adım Rehber",
    "seo_title": "ERP ve E-Ticaret Entegrasyonu: Sistemi Değiştirmeden Bağlama Rehberi",
    "seo_description": "Logo, Mikro, Netsis gibi ERP'nizi değiştirmeden e-ticaret sitenize bağlayın. Stok, fiyat ve sipariş senkronizasyonu için adım adım entegrasyon rehberi.",
    "excerpt": "Stoku Excel ile güncellemek, siparişleri elle ERP’ye girmek… Mevcut sisteminizi değiştirmeden e-ticaret sitenizle konuşturmanın yolu bir API katmanından geçiyor.",
    "cover_alt": "Veri merkezinde sunucu kabinleri",
    "content": "<p>Birçok işletmenin en değerli verisi yıllardır kullandığı ERP ya da muhasebe programında durur. E-ticarete geçildiğinde ise stoklar elle güncellenir, siparişler tek tek sisteme girilir. Bu hem zaman kaybıdır hem de hataya açıktır.</p>\n<h2>ERP'yi değiştirmek zorunda değilsiniz</h2>\n<p>Çoğu durumda yeni bir ERP'ye geçmek gerekmez. Mevcut sistemin önüne bir <strong>API katmanı</strong> kurarak verileri güvenli şekilde web sitenize, mobil uygulamanıza ya da pazar yerlerine açabilirsiniz.</p>\n<h2>Hangi veriler senkronize edilmeli?</h2>\n<ul>\n<li><strong>Stok:</strong> Satılan ürün anında düşmeli, tükenen ürün satışa kapanmalı.</li>\n<li><strong>Fiyat:</strong> ERP'deki fiyat listesi tek doğru kaynak olmalı.</li>\n<li><strong>Sipariş:</strong> Web siparişi otomatik olarak ERP'de sipariş/fatura olarak oluşmalı.</li>\n<li><strong>Müşteri:</strong> Cari kartlar çift kayıt oluşturmadan eşleşmeli.</li>\n</ul>\n<h2>Adım adım süreç</h2>\n<ol>\n<li><strong>Keşif:</strong> ERP'nin sürümü, veritabanı ve mevcut iş akışları incelenir.</li>\n<li><strong>Veri eşleştirme:</strong> Ürün kodları, varyantlar ve depolar iki sistem arasında eşlenir.</li>\n<li><strong>API katmanı:</strong> Sadece gereken verilere, yetkili erişimle açılan bir ara servis yazılır.</li>\n<li><strong>Test:</strong> Gerçek siparişlerle paralel çalıştırılır, farklar kontrol edilir.</li>\n<li><strong>Canlı kullanım ve izleme:</strong> Hatalar ve gecikmeler için uyarı sistemi kurulur.</li>\n</ol>\n<h2>Nelere dikkat etmeli?</h2>\n<p>ERP veritabanına doğrudan yazmak yerine programın kendi servisleri veya kontrollü bir ara katman kullanılmalı. Erişimler sınırlandırılmalı ve her işlem kayıt altına alınmalı.</p>\n<p>Mevcut sisteminizi nasıl bağlayabileceğimizi görmek için <a href=\"/entegrasyonlar\">entegrasyon çözümlerimize</a> göz atabilirsiniz.</p>"
  },
  "en": {
    "slug": "connect-your-erp-to-ecommerce",
    "category": "Integrations",
    "title": "Connecting Your ERP to E-commerce Without Replacing It: A Step-by-Step Guide",
    "seo_title": "ERP and E-commerce Integration: A Step-by-Step Guide",
    "seo_description": "Connect your existing ERP to your online store without replacing it. A practical guide to syncing stock, prices, orders and customers through an API layer.",
    "excerpt": "Updating stock in spreadsheets, re-typing orders into the ERP… The way to make your existing system talk to your online store goes through an API layer, not a new ERP.",
    "cover_alt": "Server racks in a data centre",
    "content": "<p>For many businesses, the most valuable data lives in the ERP or accounting software they have used for years. When they start selling online, stock is updated by hand and orders are re-entered one by one. That wastes time and invites mistakes.</p>\n<h2>You don't have to replace your ERP</h2>\n<p>In most cases there is no need to migrate to a new ERP. By placing an <strong>API layer</strong> in front of your existing system, you can safely open its data to your website, mobile app or marketplaces.</p>\n<h2>Which data should be synchronised?</h2>\n<ul>\n<li><strong>Stock:</strong> sold items are deducted instantly; out-of-stock items stop selling.</li>\n<li><strong>Prices:</strong> the ERP price list stays the single source of truth.</li>\n<li><strong>Orders:</strong> web orders are created automatically as orders/invoices in the ERP.</li>\n<li><strong>Customers:</strong> accounts are matched without creating duplicates.</li>\n</ul>\n<h2>Step-by-step process</h2>\n<ol>\n<li><strong>Discovery:</strong> review the ERP version, database and current workflows.</li>\n<li><strong>Data mapping:</strong> match product codes, variants and warehouses between systems.</li>\n<li><strong>API layer:</strong> build a middleware service that exposes only the data needed, with proper authorisation.</li>\n<li><strong>Testing:</strong> run in parallel with real orders and reconcile differences.</li>\n<li><strong>Go-live and monitoring:</strong> set up alerts for errors and delays.</li>\n</ol>\n<h2>What to watch out for</h2>\n<p>Instead of writing directly to the ERP database, use the software's own services or a controlled middleware. Limit access and log every transaction.</p>\n<p>To see how we could connect your existing system, take a look at our <a href=\"/en/integrations\">integration solutions</a>.</p>"
  },
  "de": {
    "slug": "erp-mit-onlineshop-verbinden",
    "category": "Integrationen",
    "title": "ERP mit dem Onlineshop verbinden, ohne es zu ersetzen: Schritt für Schritt",
    "seo_title": "ERP-Onlineshop-Anbindung: Schritt-für-Schritt-Anleitung",
    "seo_description": "Binden Sie Ihr bestehendes ERP an Ihren Onlineshop an, ohne es zu ersetzen. Praxisleitfaden zur Synchronisation von Bestand, Preisen, Bestellungen und Kunden per API.",
    "excerpt": "Bestände per Excel pflegen, Bestellungen von Hand ins ERP tippen… Der Weg, Ihr bestehendes System mit dem Onlineshop zu verbinden, führt über eine API-Schicht – nicht über ein neues ERP.",
    "cover_alt": "Serverschränke in einem Rechenzentrum",
    "content": "<p>Bei vielen Unternehmen liegen die wertvollsten Daten im ERP- oder Buchhaltungssystem, das seit Jahren im Einsatz ist. Mit dem Start des Onlinehandels werden Bestände dann von Hand gepflegt und Bestellungen einzeln erfasst. Das kostet Zeit und ist fehleranfällig.</p>\n<h2>Sie müssen Ihr ERP nicht ersetzen</h2>\n<p>In den meisten Fällen ist kein Umstieg auf ein neues ERP nötig. Mit einer <strong>API-Schicht</strong> vor dem bestehenden System lassen sich die Daten sicher für Website, App oder Marktplätze bereitstellen.</p>\n<h2>Welche Daten sollten synchronisiert werden?</h2>\n<ul>\n<li><strong>Bestand:</strong> Verkaufte Artikel werden sofort abgebucht, ausverkaufte nicht mehr angeboten.</li>\n<li><strong>Preise:</strong> Die Preisliste im ERP bleibt die einzige verbindliche Quelle.</li>\n<li><strong>Bestellungen:</strong> Webbestellungen werden automatisch als Auftrag/Rechnung im ERP angelegt.</li>\n<li><strong>Kunden:</strong> Kundenkonten werden ohne Dubletten zugeordnet.</li>\n</ul>\n<h2>Der Ablauf Schritt für Schritt</h2>\n<ol>\n<li><strong>Analyse:</strong> ERP-Version, Datenbank und bestehende Abläufe prüfen.</li>\n<li><strong>Daten-Mapping:</strong> Artikelnummern, Varianten und Lager zwischen den Systemen zuordnen.</li>\n<li><strong>API-Schicht:</strong> eine Middleware entwickeln, die nur die benötigten Daten mit sauberer Berechtigung freigibt.</li>\n<li><strong>Test:</strong> parallel mit echten Bestellungen laufen lassen und Abweichungen abgleichen.</li>\n<li><strong>Livebetrieb und Monitoring:</strong> Warnungen für Fehler und Verzögerungen einrichten.</li>\n</ol>\n<h2>Worauf Sie achten sollten</h2>\n<p>Statt direkt in die ERP-Datenbank zu schreiben, sollten die eigenen Schnittstellen der Software oder eine kontrollierte Middleware genutzt werden. Zugriffe begrenzen und jede Transaktion protokollieren.</p>\n<p>Wie wir Ihr bestehendes System anbinden können, sehen Sie bei unseren <a href=\"/de/integrationen\">Integrationslösungen</a>.</p>"
  },
  "ar": {
    "slug": "connect-your-erp-to-ecommerce",
    "category": "التكاملات",
    "title": "ربط نظام ERP بمتجرك الإلكتروني دون استبداله: دليل خطوة بخطوة",
    "seo_title": "تكامل ERP مع المتجر الإلكتروني: دليل خطوة بخطوة",
    "seo_description": "اربط نظام ERP الحالي بمتجرك الإلكتروني دون استبداله. دليل عملي لمزامنة المخزون والأسعار والطلبات والعملاء عبر طبقة API.",
    "excerpt": "تحديث المخزون عبر جداول Excel، وإدخال الطلبات يدوياً في ERP… الطريق لجعل نظامك الحالي يتواصل مع متجرك الإلكتروني يمر عبر طبقة API، لا عبر نظام ERP جديد.",
    "cover_alt": "خزائن خوادم في مركز بيانات",
    "content": "<p>لدى كثير من الشركات، تكمن أثمن البيانات في نظام ERP أو برنامج المحاسبة المستخدم منذ سنوات. وعند البدء بالبيع عبر الإنترنت، يُحدَّث المخزون يدوياً وتُدخل الطلبات واحداً تلو الآخر، وهذا يهدر الوقت ويفتح الباب للأخطاء.</p>\n<h2>لست مضطراً لاستبدال نظام ERP</h2>\n<p>في أغلب الحالات لا حاجة للانتقال إلى نظام جديد. بإضافة <strong>طبقة API</strong> أمام النظام الحالي، يمكنك إتاحة بياناته بأمان لموقعك أو تطبيقك أو منصات البيع.</p>\n<h2>ما البيانات التي يجب مزامنتها؟</h2>\n<ul>\n<li><strong>المخزون:</strong> يُخصم المنتج المباع فوراً، ويتوقف بيع المنتج النافد.</li>\n<li><strong>الأسعار:</strong> تبقى قائمة الأسعار في ERP المصدر الوحيد المعتمد.</li>\n<li><strong>الطلبات:</strong> تُنشأ طلبات الموقع تلقائياً كطلبات أو فواتير في ERP.</li>\n<li><strong>العملاء:</strong> تُطابق حسابات العملاء دون تكرار.</li>\n</ul>\n<h2>المراحل خطوة بخطوة</h2>\n<ol>\n<li><strong>الاستكشاف:</strong> مراجعة إصدار ERP وقاعدة البيانات وسير العمل الحالي.</li>\n<li><strong>مطابقة البيانات:</strong> ربط رموز المنتجات والمتغيرات والمستودعات بين النظامين.</li>\n<li><strong>طبقة API:</strong> بناء خدمة وسيطة تتيح البيانات اللازمة فقط مع صلاحيات محكمة.</li>\n<li><strong>الاختبار:</strong> التشغيل بالتوازي مع طلبات حقيقية ومطابقة الفروقات.</li>\n<li><strong>الإطلاق والمراقبة:</strong> إعداد تنبيهات للأخطاء والتأخيرات.</li>\n</ol>\n<h2>ما الذي يجب الانتباه إليه؟</h2>\n<p>بدلاً من الكتابة مباشرة في قاعدة بيانات ERP، يُفضّل استخدام خدمات البرنامج نفسه أو طبقة وسيطة مضبوطة، مع تقييد الصلاحيات وتسجيل كل عملية.</p>\n<p>لمعرفة كيف يمكننا ربط نظامك الحالي، اطّلع على <a href=\"/ar/integrations\">حلول التكامل</a> لدينا.</p>"
  }
}$seed$::jsonb,
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
  array['integration', 'erp', 'seed'],
  'published',
  '2026-10-08 09:00:00+03'
)
on conflict do nothing;

insert into public.blog_posts (translations, cover_image, tags, status, published_at)
values (
  $seed${
  "tr": {
    "slug": "kucuk-isletmeler-icin-yapay-zeka-otomasyonu",
    "category": "Yapay Zeka",
    "title": "Küçük İşletmeler İçin Yapay Zeka: İlk Otomasyonunuza Nereden Başlamalı?",
    "seo_title": "Küçük İşletmeler İçin Yapay Zeka Otomasyonu: Nereden Başlamalı?",
    "seo_description": "Yapay zekayı küçük bir işletmede gerçekten işe yarar hale getirmenin yolu: tekrar eden bir işi seçin, ölçün, otomatikleştirin. Örnekler ve dikkat edilmesi gerekenler.",
    "excerpt": "Yapay zeka büyük şirketlere özel değil. Doğru tek bir işle başlamak, küçük bir ekibe her hafta saatler kazandırabilir. Peki hangi işle başlamalı?",
    "cover_alt": "Bilgisayar başında çalışan ekip",
    "content": "<p>Yapay zeka denince akla genellikle büyük bütçeler ve karmaşık projeler geliyor. Oysa küçük işletmelerde en iyi sonuç, <strong>tek bir tekrar eden işi</strong> seçip onu otomatikleştirerek alınır.</p>\n<h2>İyi bir ilk aday nasıl seçilir?</h2>\n<ul>\n<li>Haftada birçok kez tekrarlanıyor mu?</li>\n<li>Kuralları az çok belli mi?</li>\n<li>Hata yapıldığında telafisi kolay mı?</li>\n<li>Bugün kaç saat harcandığını ölçebiliyor musunuz?</li>\n</ul>\n<p>Bu sorulara \"evet\" diyorsanız, iyi bir başlangıç noktası buldunuz demektir.</p>\n<h2>Sık kullanılan örnekler</h2>\n<ul>\n<li><strong>Müşteri soruları:</strong> Çalışma saatleri, fiyat, kargo durumu gibi sık soruları WhatsApp veya web sohbette ilk yanıtlayan bir asistan.</li>\n<li><strong>Belge okuma:</strong> Gelen faturalardan tutar, tarih ve firma bilgisini otomatik çıkarıp muhasebeye aktarmak.</li>\n<li><strong>Şirket içi bilgi:</strong> Prosedür ve dokümanlarınızı bilen, çalışanların sorularını yanıtlayan bir iç asistan.</li>\n<li><strong>Raporlama:</strong> Satış verilerinden haftalık özetin otomatik hazırlanması.</li>\n</ul>\n<h2>Dikkat edilmesi gerekenler</h2>\n<p>Kişisel verileri dış servislere göndermeden önce KVKK açısından değerlendirin; gerekirse modeli kendi sunucunuzda çalıştırın. Başlangıçta otomasyonun ürettiği sonuçları bir insanın kontrol etmesi, güven oluştukça kontrolü azaltmak en sağlıklı yoldur.</p>\n<h2>Sonucu ölçün</h2>\n<p>Otomasyondan önce ve sonra harcanan süreyi ve hata oranını not edin. Somut bir kazanç görüldüğünde ikinci işe geçmek çok daha kolay olur.</p>\n<p>İşletmeniz için hangi işin otomatikleştirilebileceğini konuşmak isterseniz <a href=\"/hizmetler/yapay-zeka\">yapay zeka çözümlerimize</a> göz atabilirsiniz.</p>"
  },
  "en": {
    "slug": "ai-automation-for-small-businesses",
    "category": "AI",
    "title": "AI for Small Businesses: Where to Start Your First Automation",
    "seo_title": "AI Automation for Small Businesses: Where to Start",
    "seo_description": "How to make AI genuinely useful in a small business: pick one repetitive task, measure it, automate it. Practical examples and what to watch out for.",
    "excerpt": "AI isn't just for large companies. Starting with the right single task can save a small team hours every week. So which task should you start with?",
    "cover_alt": "Team working at computers",
    "content": "<p>AI often brings to mind big budgets and complex projects. In small businesses, though, the best results come from picking <strong>one repetitive task</strong> and automating it.</p>\n<h2>How to choose a good first candidate</h2>\n<ul>\n<li>Does it happen many times a week?</li>\n<li>Are the rules more or less clear?</li>\n<li>Is a mistake easy to correct?</li>\n<li>Can you measure how many hours it takes today?</li>\n</ul>\n<p>If the answer is \"yes\", you've found a good starting point.</p>\n<h2>Common examples</h2>\n<ul>\n<li><strong>Customer questions:</strong> an assistant that gives the first answer on WhatsApp or web chat to frequent questions about opening hours, prices or delivery status.</li>\n<li><strong>Document reading:</strong> automatically extracting amounts, dates and supplier details from incoming invoices and passing them to accounting.</li>\n<li><strong>Internal knowledge:</strong> an internal assistant that knows your procedures and documents and answers staff questions.</li>\n<li><strong>Reporting:</strong> generating a weekly summary from sales data automatically.</li>\n</ul>\n<h2>What to watch out for</h2>\n<p>Check data-protection requirements (such as GDPR) before sending personal data to external services; if needed, run the model on your own servers. At first, have a person review the automation's output and reduce checks as trust grows.</p>\n<h2>Measure the result</h2>\n<p>Note the time spent and the error rate before and after automation. Once you see a concrete gain, moving on to the second task becomes much easier.</p>\n<p>If you'd like to discuss which tasks could be automated in your business, take a look at our <a href=\"/en/services/ai-solutions\">AI solutions</a>.</p>"
  },
  "de": {
    "slug": "ki-automatisierung-fuer-kleine-unternehmen",
    "category": "KI",
    "title": "KI für kleine Unternehmen: Wo Sie mit der ersten Automatisierung beginnen",
    "seo_title": "KI-Automatisierung für kleine Unternehmen: Wo anfangen?",
    "seo_description": "So wird KI im kleinen Unternehmen wirklich nützlich: eine wiederkehrende Aufgabe wählen, messen, automatisieren. Praxisbeispiele und worauf Sie achten sollten.",
    "excerpt": "KI ist nicht nur etwas für Konzerne. Mit der richtigen einzelnen Aufgabe kann ein kleines Team jede Woche Stunden sparen. Aber mit welcher Aufgabe beginnen?",
    "cover_alt": "Team bei der Arbeit am Computer",
    "content": "<p>Bei KI denken viele an große Budgets und komplexe Projekte. In kleinen Unternehmen erzielt man die besten Ergebnisse jedoch, wenn man <strong>eine wiederkehrende Aufgabe</strong> auswählt und automatisiert.</p>\n<h2>So finden Sie einen guten ersten Kandidaten</h2>\n<ul>\n<li>Fällt die Aufgabe mehrmals pro Woche an?</li>\n<li>Sind die Regeln einigermaßen klar?</li>\n<li>Lässt sich ein Fehler leicht korrigieren?</li>\n<li>Können Sie messen, wie viele Stunden sie heute kostet?</li>\n</ul>\n<p>Wenn Sie mit „Ja“ antworten, haben Sie einen guten Startpunkt gefunden.</p>\n<h2>Typische Beispiele</h2>\n<ul>\n<li><strong>Kundenanfragen:</strong> ein Assistent, der häufige Fragen zu Öffnungszeiten, Preisen oder Lieferstatus per WhatsApp oder Web-Chat zuerst beantwortet.</li>\n<li><strong>Belege auslesen:</strong> Betrag, Datum und Lieferant automatisch aus eingehenden Rechnungen übernehmen und an die Buchhaltung weitergeben.</li>\n<li><strong>Internes Wissen:</strong> ein interner Assistent, der Ihre Abläufe und Dokumente kennt und Fragen der Mitarbeitenden beantwortet.</li>\n<li><strong>Reporting:</strong> eine wöchentliche Zusammenfassung aus den Verkaufsdaten automatisch erstellen.</li>\n</ul>\n<h2>Worauf Sie achten sollten</h2>\n<p>Prüfen Sie die DSGVO-Anforderungen, bevor personenbezogene Daten an externe Dienste gehen; bei Bedarf läuft das Modell auf Ihren eigenen Servern. Lassen Sie die Ergebnisse anfangs von einem Menschen prüfen und reduzieren Sie die Kontrolle, wenn das Vertrauen wächst.</p>\n<h2>Messen Sie das Ergebnis</h2>\n<p>Notieren Sie Zeitaufwand und Fehlerquote vor und nach der Automatisierung. Sobald ein konkreter Nutzen sichtbar ist, fällt der Schritt zur zweiten Aufgabe deutlich leichter.</p>\n<p>Wenn Sie besprechen möchten, welche Aufgaben sich in Ihrem Unternehmen automatisieren lassen, sehen Sie sich unsere <a href=\"/de/leistungen/ki-loesungen\">KI-Lösungen</a> an.</p>"
  },
  "ar": {
    "slug": "ai-automation-for-small-businesses",
    "category": "الذكاء الاصطناعي",
    "title": "الذكاء الاصطناعي للشركات الصغيرة: من أين تبدأ أول أتمتة؟",
    "seo_title": "أتمتة الذكاء الاصطناعي للشركات الصغيرة: من أين تبدأ؟",
    "seo_description": "كيف تجعل الذكاء الاصطناعي مفيداً فعلاً في شركة صغيرة: اختر مهمة متكررة واحدة، قِسها، ثم أتمِتها. أمثلة عملية وما يجب الانتباه إليه.",
    "excerpt": "الذكاء الاصطناعي ليس حكراً على الشركات الكبرى. البدء بالمهمة المناسبة يمكن أن يوفّر على فريق صغير ساعات كل أسبوع. فبأي مهمة تبدأ؟",
    "cover_alt": "فريق يعمل على أجهزة الحاسوب",
    "content": "<p>يرتبط الذكاء الاصطناعي في أذهان كثيرين بميزانيات ضخمة ومشاريع معقدة. لكن في الشركات الصغيرة، تأتي أفضل النتائج من اختيار <strong>مهمة متكررة واحدة</strong> وأتمتتها.</p>\n<h2>كيف تختار المرشح الأول المناسب؟</h2>\n<ul>\n<li>هل تتكرر المهمة عدة مرات في الأسبوع؟</li>\n<li>هل قواعدها واضحة إلى حد ما؟</li>\n<li>هل يسهل تصحيح الخطأ إن وقع؟</li>\n<li>هل يمكنك قياس عدد الساعات التي تستغرقها اليوم؟</li>\n</ul>\n<p>إذا كانت الإجابة \"نعم\"، فقد وجدت نقطة بداية جيدة.</p>\n<h2>أمثلة شائعة</h2>\n<ul>\n<li><strong>أسئلة العملاء:</strong> مساعد يرد أولاً عبر واتساب أو دردشة الموقع على الأسئلة المتكررة عن ساعات العمل والأسعار وحالة الشحن.</li>\n<li><strong>قراءة المستندات:</strong> استخراج المبلغ والتاريخ وبيانات المورّد تلقائياً من الفواتير الواردة وإرسالها إلى المحاسبة.</li>\n<li><strong>المعرفة الداخلية:</strong> مساعد داخلي يعرف إجراءاتكم ومستنداتكم ويجيب عن أسئلة الموظفين.</li>\n<li><strong>التقارير:</strong> إعداد ملخص أسبوعي من بيانات المبيعات تلقائياً.</li>\n</ul>\n<h2>ما الذي يجب الانتباه إليه؟</h2>\n<p>راجع متطلبات حماية البيانات قبل إرسال بيانات شخصية إلى خدمات خارجية، ويمكن عند الحاجة تشغيل النموذج على خوادمكم الخاصة. في البداية، اجعل شخصاً يراجع نتائج الأتمتة، ثم قلّل المراجعة مع ازدياد الثقة.</p>\n<h2>قِس النتيجة</h2>\n<p>سجّل الوقت المستغرق ونسبة الأخطاء قبل الأتمتة وبعدها. وعندما ترى مكسباً ملموساً يصبح الانتقال إلى المهمة الثانية أسهل بكثير.</p>\n<p>إذا أردت مناقشة المهام التي يمكن أتمتتها في شركتك، اطّلع على <a href=\"/ar/services/ai-solutions\">حلول الذكاء الاصطناعي</a> لدينا.</p>"
  }
}$seed$::jsonb,
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80',
  array['ai', 'automation', 'seed'],
  'published',
  '2026-09-24 09:00:00+03'
)
on conflict do nothing;
