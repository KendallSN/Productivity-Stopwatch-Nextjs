# Productivity-Stopwatch-Nextjs
 
Tema #2

## Hooks

- **useRef:**  
  Permite crear una referencia mutable que se mantiene a lo largo de todo el ciclo de vida del componente. Es ideal para almacenar valores que no deberían causar un re-render al actualizarse, como el identificador de un temporizador.

- **useMemo:**  
  Optimiza el rendimiento memorizando el valor calculado, de modo que solo se recalcula cuando alguno de sus valores dependientes cambia. Esto es útil para evitar cálculos pesados en cada render.

- **useLocalStorage (Hook personalizado):**  
  Facilita la sincronización del estado del componente con el localStorage del navegador, permitiendo persistir datos (como el historial de sesiones) entre recargas de la página.

## Next.js (Partes)

- **Dynamic & Static Rendering:**  
  Next.js permite combinar Renderizado Estático (Static Generation) y Renderizado Dinámico (Server-Side Rendering), ofreciendo flexibilidad en cómo se cargan y actualizan las páginas dependiendo de las necesidades de la aplicación.

- **Layouts:**  
  Se utilizan para definir estructuras de interfaz coherentes y reutilizables en múltiples páginas de la aplicación. Proporcionan una experiencia de usuario consistente y facilitan la gestión de elementos comunes (como encabezados y barras laterales).

- **Container-Presenter Pattern:**  
  Separa la lógica de negocio de la presentación. El componente "Container" gestiona el estado, la lógica y la interacción con la API, mientras que el "Presenter" se encarga de renderizar la interfaz de usuario de forma pura y sin lógica adicional.

- **Singleton Pattern:**  
  En este contexto, puede referirse a la implementación de ciertos servicios o instancias únicas dentro de la aplicación (por ejemplo, un único gestor de temporizadores o una instancia centralizada de configuración) que se reutiliza en varias partes del proyecto para mantener la consistencia y evitar la duplicación innecesaria de código.

Reto:
    Cronómetro de Productividad: Una aplicación para gestionar sesiones de estudio o trabajo, permitiendo a los usuarios registrar y visualizar estadísticas sobre su tiempo invertido. useRef controla el temporizador sin provocar renders innecesarios, useMemo optimiza los cálculos de duración y eficiencia, y useLocalStorage almacena el historial de sesiones para futuras consultas. Se utiliza un Layout para mantener una estructura coherente en la interfaz y mejorar la experiencia del usuario, se tienen varios cronómetros activos a la vez, y los tiempos se muestran con formato para humanos (hace 30 minutos, hace 2 días).