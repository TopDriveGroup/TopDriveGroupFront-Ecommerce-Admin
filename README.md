<!-- 


CONVENCIONES DEL PROYECTO:

## LandingPage:
El párrafo introductorio de la sección va centrado


## Padding en los componentes de la LandingPage
Se hacen con Bootstrap
<div className={`${styles.container} mb-2 mt-2`}>
.container {
  max-width: 1200px;
  min-height: 450px;
  padding: 20px 0;
}


TITULOS
## Color de títulos:
color: #e4002b;


## Color de letras de contenido
color: #495057;


## título principal de la marca:
<div>
    <h1 className={`${styles.title__TopDriveGroup} text-center`}>Top Drive Group</h1>
</div>
.title__TopDriveGroup {
  font-weight: 700;
  color: #e4002b;
}


## Títulos principales se cada sección en la LandingPage o inicio de componentes:
<h1 className={`${styles.main__Title} m-0 text-center`}>Soluciones</h1>
.main__Title {
  font-weight: 700;
  color: #e4002b;
}


## Títulos secundarios en cada sección en la LandingPage o inicio de componentes:
<h3 className={`${styles.secundary__Title} m-0`}>Colombia</h3>
.secundary__Title {
  font-weight: 700;
  color: #e4002b;
}


## Títulos terciarios en cada sección en la LandingPage o inicio de componentes:
<h4 className={`${styles.tertiary__Title } m-0`}>TARJETAS DE CRÉDITO:</h4>
.tertiary__Title {
  font-weight: 700;
  color: #e4002b;
}


## Componentes:
Los párrafor no van centrados


## Altura mínima de cada Page:
.container {
  min-height: calc(100vh - 120px);
  max-width: 1200px;
  padding: 20px 0;
}


## Estilos de marca:
Siempre donde se nombre Top Drive SAS, Top Drive Group o cual quier alusión de la marca, se debe de estilizar
<span className={styles.topDriveGroup}>Top Drive Group</span>
.topDriveGroup {
  font-weight: 800;
  color: #e4002b;
}


## Botones:
<div className={`${styles.container__link__Button} d-flex align-items-center justify-content-center`}>
  <Link to="/soluciones/cables" className={`${styles.link__Button} text-decoration-none`} >SABER MAS +</Link>
</div>
.container__link__Button {
  height: 50px;
  width: 100%;
}
.link__Button {
  font-size: 16px;
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
  background: #e4002b;
  border-radius: 5px;
  padding: 10px 20px;
}
.link__Button:hover {
  font-weight: 700;
  cursor: pointer;
  background: #cc0000;
} 



-->