// Gerekli yardımcı fonksiyonları içe aktar
import { detecType, setStorage, detecIcon } from "./helpers.js";

// HTML'den gelen öğeleri seç
const form = document.querySelector("form");
const list = document.querySelector("ul");

// Olay İzleyicileri
form.addEventListener("submit", handleSubmit);
list.addEventListener("click", handleClick);

// Ortak Kullanım Alanı
var map; // Harita nesnesini saklamak için değişken
var notes = JSON.parse(localStorage.getItem("notes")) || []; // Notları saklamak için dizi, localStorage'dan al veya boş dizi oluştur
var coords = []; // Koordinatları saklamak için dizi
var layerGroup = []; // Katmanları saklamak için dizi

// Kullanıcının konumunu al ve haritayı yükle
navigator.geolocation.getCurrentPosition(
  loadMap, // Başarılı olduğunda loadMap fonksiyonunu çağır
  () => console.log("Kullanıcı kabul etmedi") // Hata durumunda konsola mesaj yaz
);

// Haritaya tıklandığında çalışacak fonksiyon
function onMapClick(e) {
  form.style.display = "flex"; // Formu göster
  coords = [e.latlng.lat, e.latlng.lng]; // Tıklanan konumu sakla
}

// Kullanıcının konumuna göre haritayı yükle
function loadMap(e) {
  map = new L.map("map").setView([e.coords.latitude, e.coords.longitude], 10); // Haritayı oluştur ve kullanıcının konumuna göre ayarla
  L.control; // Leaflet kontrol nesnesini yükle
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 7,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map); // Haritaya katman ekle
  layerGroup = L.layerGroup().addTo(map); // İşaretçileri tutacak katmanı oluştur ve haritaya ekle
  renderNoteList(notes); // Notları ekrana bas
  map.on("click", onMapClick); // Haritada tıklama olayını dinle
}

// Notu ekrana basan fonksiyon
function renderMarker(item) {
  L.marker(item.coords, { icon: detecIcon(item.status) })
    .addTo(layerGroup)
    .bindPopup(`${item.desc}`); // İşaretçi oluştur ve popup içeriğini ayarla
}

// Form gönderildiğinde çalışacak fonksiyon
function handleSubmit(e) {
  e.preventDefault();
  const desc = e.target[0].value;
  if (!desc) return;
  const date = e.target[1].value;
  const status = e.target[2].value;
  notes.push({ id: new Date().getTime(), desc, date, status, coords });
  setStorage(notes);
  renderNoteList(notes);
  form.style.display = "none"; // Formu gizle
}

// Notları ekrana basan fonksiyon
function renderNoteList(item) {
  list.innerHTML = ""; // Liste öğesini temizle
  layerGroup.clearLayers(); // Katmanları temizle
  item.forEach((item) => {
    const listElement = document.createElement("li");
    listElement.dataset.id = item.id; // ID'yi ayarla
    listElement.innerHTML = `
      <div>
        <p>${item.desc}</p>
        <p><span>Tarih:</span>${item.date}</p>
        <p><span>Durum:</span>${detecType(item.status)}</p>
        <i class="bi bi-x" id="delete"></i>
        <i class="bi bi-airplane-fill" id="fly"></i>
      </div>
    `;
    list.insertAdjacentElement("afterbegin", listElement); // Listeye ekle
    renderMarker(item); // İşaretçiyi oluştur
  });
}

// Liste öğesine tıklandığında çalışacak fonksiyon
function handleClick(e) {
  const id = e.target.parentElement.parentElement.dataset.id;
  if (e.target.id === "delete") {
    notes = notes.filter((note) => note.id != id); // Notu sil
    setStorage(notes); // localStorage'i güncelle
    renderNoteList(notes); // Ekrana yeniden bas
  }
  if (e.target.id === "fly") {
    const note = notes.find((note) => note.id == id); // Notu bul
    map.flyTo(note.coords); // Haritayı notun koordinatlarına hareket ettir
  }
}
