/*
 * Tipi analiz edip ona göre fonksiyonun çağrıldığı yere
 * tipe denk gelen açıklmayı gönderme
 */
export const detecType = (type) => {
  switch (type) {
    case "park":
      return "Park Yeri";
    case "home":
      return "Ev";
    case "job":
      return "İş";
    case "goto":
      return "Ziyaret";
    default:
      return "Bilinmeyen Tip";
  }
};

export const setStorage = (data) => {
  // Veriyi locale göndermek için stringe çevirme
  const strData = JSON.stringify(data);
  // localStorage güncelleme
  localStorage.setItem("notes", strData);
};

// İkonlar
var carIcon = L.icon({
  iconUrl: "./images/car.png",
  iconSize: [50, 50],
});

var homeIcon = L.icon({
  iconUrl: "./images/home-marker.png",
  iconSize: [50, 50],
});

var jobIcon = L.icon({
  iconUrl: "./images/job.png",
  iconSize: [50, 50],
});

var visitIcon = L.icon({
  iconUrl: "./images/visit.png",
  iconSize: [50, 50],
});

// Tipin simgesini (ikonunu) belirleme
export function detecIcon(type) {
  switch (type) {
    case "park":
      return carIcon;
    case "home":
      return homeIcon;
    case "job":
      return jobIcon;
    case "goto":
      return visitIcon;
    default:
      return null; // Bilinmeyen tip için null döndür
  }
}
