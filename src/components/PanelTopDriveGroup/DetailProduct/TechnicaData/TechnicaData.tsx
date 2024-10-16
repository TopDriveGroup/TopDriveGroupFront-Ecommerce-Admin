import { useState } from 'react';
// ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../types/product.types';
import { PiCaretUp, PiCaretDown } from "react-icons/pi";
import styles from './styles.module.css';

interface SideBarProps {
    product: IProduct;
}

function TechnicaData({product}: SideBarProps) {
    const [showTechnicalData, setShowTechnicalData] = useState(false);

    // EXPANSIÓN DE LA FICHA TECNICA
    function handleShowBanks() {
        setShowTechnicalData(true);
    }
    
    // CONTRACCIÓN DE LA FICHA TECNICA
    function handleHideBanks() {
        setShowTechnicalData(false);
    }

    return (
        <div className={`${styles.container__Technical_Data} mt-4`}>
            <div className={`${styles.technical__Data} pt-1 pb-1 px-0 d-flex align-items-center justify-content-between`}>
                <h3 className={styles.tittle__Technical_Data}>Características técnicas</h3>
                {showTechnicalData === false && (
                    <PiCaretDown className={`${styles.icon__Show} `} onClick={handleShowBanks} />
                )}
                {showTechnicalData === true && (
                    <PiCaretUp className={`${styles.icon__Show} `} onClick={handleHideBanks} />
                )}
            </div>

            {showTechnicalData && (
                <div className="pt-2">
                    <div className={`${styles.container__Characteristics} mb-4`}>
                        <h5 className={styles.title__Characteristics}>Información general</h5>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Código SAP</div>
                            <div className={styles.value__Characteristics}>{product.sap}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Clase</div>
                            <div className={styles.value__Characteristics}>{product.class}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Categoría</div>
                            <div className={styles.value__Characteristics}>{product.category}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Tipo</div>
                            <div className={styles.value__Characteristics}>{product.type}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Grupo</div>
                            <div className={styles.value__Characteristics}>{product.group}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Unidad de medida</div>
                            <div className={styles.value__Characteristics}>{product.unitMeasure}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Fabricante</div>
                            <div className={styles.value__Characteristics}>{product.manufacturer}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Familia</div>
                            <div className={styles.value__Characteristics}>{product.family}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Serie</div>
                            <div className={styles.value__Characteristics}>{product.series}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Referencia</div>
                            <div className={styles.value__Characteristics}>{product.reference}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Activo</div>
                            <div className={styles.value__Characteristics}>{product.active}</div>
                        </div>
                    </div>
                    
                    <div className={`${styles.container__Characteristics} mb-4`}>
                        <h5 className={styles.title__Characteristics}>Características constructivas</h5>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Código SAP</div>
                            <div className={styles.value__Characteristics}>{product.sap}</div>
                        </div>
                    </div>

                    <div className={`${styles.container__Characteristics} mb-4`}>
                        <h5 className={styles.title__Characteristics}>Características eléctricas</h5>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Tipo de tensión</div>
                            <div className={styles.value__Characteristics}>{product.tensionType}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Tensión mínima</div>
                            <div className={styles.value__Characteristics}>{product.minimumTension}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Tensión máxima</div>
                            <div className={styles.value__Characteristics}>{product.maximumTension}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Corriente de entrada</div>
                            <div className={styles.value__Characteristics}>{product.inputCurrent}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Corriente de salida</div>
                            <div className={styles.value__Characteristics}>{product.outputCurrent}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Potencia</div>
                            <div className={styles.value__Characteristics}>{product.power}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Voltaje de potencia</div>
                            <div className={styles.value__Characteristics}>{product.powerVoltage}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Caballaje</div>
                            <div className={styles.value__Characteristics}>{product.horsepower}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Voltaje de caballaje</div>
                            <div className={styles.value__Characteristics}>{product.horsepowerVoltage}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Frecuencia</div>
                            <div className={styles.value__Characteristics}>{product.frequency}</div>
                        </div>
                    </div>

                    <div className={`${styles.container__Characteristics} mb-4`}>
                        <h5 className={styles.title__Characteristics}>Características mecánicas</h5>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Polos</div>
                            <div className={styles.value__Characteristics}>{product.poles}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Tamaño</div>
                            <div className={styles.value__Characteristics}>{product.size}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Alto</div>
                            <div className={styles.value__Characteristics}>{product.high}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Ancho</div>
                            <div className={styles.value__Characteristics}>{product.width}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Profundo</div>
                            <div className={styles.value__Characteristics}>{product.deep}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Peso</div>
                            <div className={styles.value__Characteristics}>{product.weight}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Montaje</div>
                            <div className={styles.value__Characteristics}>{product.mounting}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Conexión</div>
                            <div className={styles.value__Characteristics}>{product.connection}</div>
                        </div>
                    </div>

                    <div className={`${styles.container__Characteristics} mb-4`}>
                        <h5 className={styles.title__Characteristics}>Condiciones ambientales</h5>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Eficiencia</div>
                            <div className={styles.value__Characteristics}>{product.efficiency}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>IP</div>
                            <div className={styles.value__Characteristics}>{product.ip}</div>
                        </div>
                    </div>

                    <div className={`${styles.container__Characteristics} mb-4`}>
                        <h5 className={styles.title__Characteristics}>Dimensiones</h5>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Polos</div>
                            <div className={styles.value__Characteristics}>{product.poles}</div>
                        </div>
                    </div>

                    <div className={`${styles.container__Characteristics} mb-4`}>
                        <h5 className={styles.title__Characteristics}>Normas y estándares</h5>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Norma</div>
                            <div className={styles.value__Characteristics}>{product.standard}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Protocolo</div>
                            <div className={styles.value__Characteristics}>{product.protocol}</div>
                        </div>
                    </div>

                    <div className={`${styles.container__Characteristics} mb-4`}>
                        <h5 className={styles.title__Characteristics}>Documentación</h5>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Aplicaciones</div>
                            <div className={styles.value__Characteristics}>{product.applications}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Página</div>
                            <div className={styles.value__Characteristics}>{product.page}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Web</div>
                            <div className={styles.value__Characteristics}>{product.web}</div>
                        </div>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Datasheet</div>
                            <div className={styles.value__Characteristics}>{product.datasheet}</div>
                        </div>
                    </div>

                    <div className={`${styles.container__Characteristics} mb-4`}>
                        <h5 className={styles.title__Characteristics}>Accesorios</h5>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Aplicaciones</div>
                            <div className={styles.value__Characteristics}>{product.applications}</div>
                        </div>
                    </div>

                    <div className={`${styles.container__Characteristics} mb-4`}>
                        <h5 className={styles.title__Characteristics}>Homólogos</h5>
                        <div className={`${styles.container__Propertie} d-flex`}>
                            <div className={styles.title__Propertie}>Aplicaciones</div>
                            <div className={styles.value__Characteristics}>{product.applications}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TechnicaData;