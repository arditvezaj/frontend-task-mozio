import { Destination } from "../types/destination";

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

function findTop5NearestDestinations(
  coord: [number, number],
  destinations: Destination[]
): (Destination & { distance: number })[] {
  const [lat1, lon1] = coord;

  const filteredDestinations = destinations.filter(
    (place) => !(place.latitude === lat1 && place.longitude === lon1)
  );

  const destinationsWithDistance = filteredDestinations.map((place) => {
    const distance = getDistanceFromLatLonInKm(
      lat1,
      lon1,
      place.latitude,
      place.longitude
    );
    return { ...place, distance };
  });

  const sortedDestinations = destinationsWithDistance.sort(
    (a, b) => a.distance - b.distance
  );

  return sortedDestinations.slice(0, 5);
}

export default findTop5NearestDestinations;
