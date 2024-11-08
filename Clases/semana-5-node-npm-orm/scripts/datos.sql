-- Insersión de clasificaciones
INSERT INTO CLASIFICACIONES  (IdClasificacion, NombreClasificacion)
VALUES
(1, 'ATP'),
(2, 'Mayor de 12'),
(3, 'R')
;


-- Inserción de películas
INSERT INTO PELICULAS  (Titulo, Director, Genero, Sinopsis, Duracion, IdClasificacion)
VALUES
  ('Sueño de fuga', 'Frank Darabont', 'Drama', 'Dos hombres encarcelados establecen una estrecha amistad a lo largo de los años, encontrando consuelo y redención a través de actos de decencia común.', 80, 1),
  ('El padrino', 'Francis Ford Coppola', 'Drama', 'El patriarca de una dinastía del crimen organizado traslada el control de su imperio clandestino a su renuente hijo.', 860, 1),
  ('El caballero de la noche', 'Christopher Nolan', 'Acción', 'Cuando la amenaza conocida como el Joker causa estragos y caos en la gente de Gotham, Batman debe aceptar una de las pruebas psicológicas y físicas más grandes de su capacidad para luchar contra la injusticia.', 80, 2),
  ('El señor de los anillos: El retorno del rey', 'Peter Jackson', 'Fantasía', 'Gandalf y Aragorn lideran el Mundo de los Hombres contra el ejército de Sauron para desviar su mirada de Frodo y Sam mientras se acercan a Monte del Destino con el Anillo Único.', 90, 1),
  ('Pulp Fiction', 'Quentin Tarantino', 'Crimen', 'Las vidas de dos asesinos a sueldo, un boxeador, un gánster y su esposa, y una pareja de ladrones de restaurantes se entrelazan en cuatro relatos de violencia y redención.', 140, 3),
  ('Forrest Gump', 'Robert Zemeckis', 'Drama', 'Las presidencias de Kennedy y Johnson, los eventos de Vietnam, Watergate y otros eventos históricos se desarrollan a través de la perspectiva de un hombre de Alabama con un coeficiente intelectual de 75, cuyo único deseo es reunirse con su amor de la infancia.', 70, 1),
  ('Origen', 'Christopher Nolan', 'Acción', 'Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños recibe la tarea inversa de plantar una idea en la mente de un C.E.O.', 120, 2),
  ('Matrix', 'Lana Wachowski, Lilly Wachowski', 'Acción', 'Un hacker informático aprende de misteriosos rebeldes sobre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladores.', 90, 2),
  ('Interestelar', 'Christopher Nolan', 'Ciencia ficción', 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.', 100, 2),
  ('El silencio de los inocentes', 'Jonathan Demme', 'Crimen', 'Un joven cadete del F.B.I. debe recibir la ayuda de un asesino caníbal encarcelado y manipulador para ayudar a capturar a otro asesino en serie.', 80, 3)
;
