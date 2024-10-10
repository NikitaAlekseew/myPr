// @ts-ignore

import { YMaps, Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

interface PlaceType {
  id: number;
  title: string;
  latitude: string;
  longitude: string;
  address: string;
  description: string;
}

// интерфейс для балуна (Placemark)
interface PlacemarkType {
  id: number; // айдишник балуна
  name: string; // имя балуна
  coordinates: [number, number]; // Координаты балуна (широта, долгота)
  balloonContent: string; // Контент для балуна
}

// интерфейс пропсов для MapComponent
interface MapComponentProps {
  selectedPlacemarks: number[]; // массив айдишников выбранных балунов
}

const MapComponentContent: React.FC<{
  placemarksData: PlacemarkType[];
  selectedPlacemarks: number[];
  setRouteInfo: any;
}> = ({ placemarksData, selectedPlacemarks, setRouteInfo }) => {
  const mapRef = useRef<any>(null);
  const ymaps = useYMaps(["multiRouter.MultiRoute"]); // Использование useYMaps внутри компонента, обернутого YMaps
  const previousCoordinates = useRef<any[]>([]);
  useEffect(() => {
    if (ymaps && mapRef.current) {
      const selectedCoordinates = placemarksData
        .filter((placemark: PlacemarkType) =>
          selectedPlacemarks.includes(placemark.id)
        )
        ?.map((placemark: PlacemarkType) => placemark.coordinates);

      mapRef.current.geoObjects.removeAll(); // Удаляем все предыдущие маршруты

      if (selectedCoordinates.length > 1) {
        const multiRoute = new ymaps.multiRouter.MultiRoute(
          {
            referencePoints: selectedCoordinates,
            params: {
              routingMode: "auto",
            },
          },
          {
            boundsAutoApply: true,
          }
        );

        mapRef.current.geoObjects.add(multiRoute); // Добавляем новый маршрут

        // После добавления маршрута на карту, можно получить информацию о времени и расстоянии
        multiRoute.model.events.add("requestsuccess", () => {
          const activeRoute = multiRoute.getActiveRoute();
          if (activeRoute) {
            const distance = activeRoute.properties.get("distance").text;
            const duration = activeRoute.properties.get("duration").text;
            setRouteInfo({ distance, duration });

            // Выводим информацию в консоль
            console.log(`Distance: ${distance}, Duration: ${duration}`);
          }
        });
      }
    }
  }, [ymaps, placemarksData, selectedPlacemarks]);

  // useEffect(() => {
  //   if (ymaps && mapRef.current) {
  //     const selectedCoordinates = placemarksData
  //       .filter((placemark: PlacemarkType) =>
  //         selectedPlacemarks.includes(placemark.id)
  //       )
  //       ?.map((placemark: PlacemarkType) => placemark.coordinates);

  //     // Проверяем, есть ли действительно изменения в маршруте
  //     if (
  //       selectedCoordinates.length > 1 &&
  //       JSON.stringify(selectedCoordinates) !==
  //         JSON.stringify(previousCoordinates.current)
  //     ) {
  //       mapRef.current.geoObjects.removeAll(); // Удаляем все предыдущие маршруты

  //       const multiRoute = new ymaps.multiRouter.MultiRoute(
  //         {
  //           referencePoints: selectedCoordinates,
  //           params: {
  //             routingMode: "auto",
  //           },
  //         },
  //         {
  //           boundsAutoApply: true,
  //         }
  //       );

  //       mapRef.current.geoObjects.add(multiRoute); // Добавляем новый маршрут

  //       // После добавления маршрута на карту, можно получить информацию о времени и расстоянии
  //       multiRoute.model.events.add("requestsuccess", () => {
  //         const activeRoute = multiRoute.getActiveRoute();
  //         if (activeRoute) {
  //           const distance = activeRoute.properties.get("distance").text;
  //           const duration = activeRoute.properties.get("duration").text;
  //           setRouteInfo({ distance, duration });

  //           // Выводим информацию в консоль
  //           console.log(`Distance: ${distance}, Duration: ${duration}`);
  //         }
  //       });

  //       // Сохраняем текущие координаты для сравнения при следующем рендере
  //       previousCoordinates.current = selectedCoordinates;
  //     }
  //   }
  // }, [ymaps, placemarksData, selectedPlacemarks]);

  return (
    <Map
      defaultState={{ center: [54.706443, 20.511817], zoom: 12 }}
      width="670px"
      height="500px"
      instanceRef={(ref) => {
        mapRef.current = ref;
      }}
    >
      {placemarksData
        .filter((placemark: PlacemarkType) =>
          selectedPlacemarks.includes(placemark.id)
        )
        ?.map((placemark: PlacemarkType) => (
          <Placemark
            key={placemark.id}
            geometry={placemark.coordinates}
            properties={{
              balloonContent: placemark.balloonContent,
            }}
            options={{
              preset: "islands#blueStarCircleIcon",
              iconColor: "#ffa500",
            }}
            modules={["geoObject.addon.balloon"]}
          />
        ))}
    </Map>
  );
};

const MapComponent: React.FC<MapComponentProps> = ({
  setRouteInfo,
  selectedPlacemarks,
}) => {
  const [placemarksData, setPlacemarksData] = useState<PlacemarkType[]>([]);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/data/places`
        );

        const newArray = response.data?.map((place: PlaceType) => ({
          id: place.id,
          name: place.title,
          coordinates: [
            parseFloat(place.latitude),
            parseFloat(place.longitude),
          ],
          balloonContent: `
        <div>
        <h2>${place.title}</h2>
        <p><strong>Адрес:</strong> ${place.address}</p>
        <img src="https://muzobozrenie.ru/wp-content/uploads/2018/10/kaliningrad_sobor.jpg" alt="${place.title}" style="width:100%;height:auto;" />
        <p>${place.description}</p>
               </div>
               `,
        }));
        setPlacemarksData(newArray);
      } catch (error) {
        console.error("Ошибка при загрузке данных из таблицы Places:", error);
      }
    };

    getPlaces();
  }, []);

  return (
    <YMaps query={{ apikey: "72ba95d5-7112-4c39-8265-d94967e45145" }}>
      <MapComponentContent
        placemarksData={placemarksData}
        selectedPlacemarks={selectedPlacemarks}
        setRouteInfo={setRouteInfo}
      />
    </YMaps>
  );
};

export default MapComponent;
