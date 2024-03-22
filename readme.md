# Lokasyon Bazlı Notlar Uygulaması

Bu proje, kullanıcıların belirli konumlara ilişkin notlar eklemelerine ve bu notları harita üzerinde görüntülemelerine olanak tanıyan bir web uygulamasıdır.

## Kullanım

1. Kullanıcı, web uygulamasını ziyaret ettiğinde, mevcut konumuna dayalı olarak bir harita görüntülenir.
2. Kullanıcı, harita üzerinde belirli bir konuma tıkladığında, o konuma ilişkin bir not eklemek için bir form görüntülenir.
3. Kullanıcı not ekledikten sonra, bu not harita üzerinde ilgili konumda bir işaretçi olarak gösterilir.
4. Kullanıcı, harita üzerindeki notları görüntüleyebilir, düzenleyebilir veya silebilir.

## Fonksiyonlar

- `detecType(type)`: Verilen bir tip için açıklamayı döndürür.
- `detecIcon(type)`: Verilen bir tip için ilgili simgeyi (ikonu) döndürür.
- `setStorage(data)`: Verilen veriyi yerel depolamaya (localStorage) kaydeder.

## Kullanılan İkonlar

- "park": Park yeri simgesi
- "home": Ev simgesi
- "job": İş simgesi
- "goto": Ziyaret simgesi

## Kullanılan Teknolojiler

- HTML, CSS ve JavaScript
- Leaflet.js: Harita oluşturmak ve işaretçileri yönetmek için kullanılan bir kütüphane


## gif
<img src="./images/screen.gif"># notsMap
