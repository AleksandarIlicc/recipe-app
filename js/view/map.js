export function mapLeaflet() {
    const map = L.map('map').setView([52.3346306, 12.3248982,4.29], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([48.8603111, 2.4060977]).addTo(map)
    .bindPopup('The Old Stamp House Restaurant')
    .openPopup();

    L.marker([41.9025314, 12.4895198]).addTo(map)
    .bindPopup('Taverne Trinacria')
    .openPopup();

    L.marker([51.5061167, -0.1435946]).addTo(map)
    .bindPopup('Kiss Me Lounge')
    .openPopup();
    
    L.marker([52.5250723, 13.3475083]).addTo(map)
    .bindPopup('Restaurant Grüne Lampe')
    .openPopup();
    
    L.marker([45.4670125, 9.1749175]).addTo(map)
    .bindPopup(`Sophia's Restaurant`)
    .openPopup();

    L.marker([43.3146683, 21.88476,20.29]).addTo(map)
    .bindPopup('Restoran Trpeza Nis')
    .openPopup();

    const circle = L.circle([43.3146683, 21.88476,20.29], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 50
    }).addTo(map);
}