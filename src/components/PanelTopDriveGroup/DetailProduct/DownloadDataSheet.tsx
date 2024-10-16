/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Document, Image, View, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { IProduct } from '../../../types/product.types';
import LogoTopDrive from '../../../assets/TopDriveGroup/LogoTopDrive.png';

const stylesPDF = StyleSheet.create({
    container: {
        padding: '20px 0 90px 0',
    },
    container__Head: {
        margin: '-20px 0 25px 0',
        padding: '20px 40px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: '#212322',
    },
    logo_Top_Drive: {
        width: 200,
        height: 52,
    },
    container__Characteristics: {
        width: 450,
        margin: '10px auto 0 auto',
    },
    title__Characteristics: {
        fontSize: 16,
        marginBottom: 10,
        color: '#212322',
    },
    container__Propertie: {
        borderBottom: '1px solid #ced4da',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    title__Propertie: {
        width: 170,
        fontSize: 12,
        backgroundColor: '#f0f0f0',
        padding: '5px 10px',
    },
    value__Characteristics: {
        fontSize: 12,
        flex: 1,
        padding: '5px 10px',
    },
    container__Head_Product: {
        margin: '0 auto 25px auto',
        height: 100,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container__Image: {
        height: 100,
        width: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image__Product: {
        height: 70,
        margin: 'auto',
    },
    container_Title__Product: {
        height: 100,
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title__Product: {
        fontSize: 16,
        color: '#212322',
    },
    title__Sap_Product: {
        fontSize: 10,
        color: '#495057',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 10,
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

// Definir la interfaz para las secciones
interface CharacteristicsSection {
    title: string;
    properties: {
        name: string;
        value: string | number | undefined; // Permitir undefined aquí
    }[];
}

interface DownloadDataSheetProps {
    product: IProduct;
}

function DownloadDataSheet({ product }: DownloadDataSheetProps) {
    const renderCharacteristicsSections = () => {
        const characteristics: CharacteristicsSection[] = [
            {
                title: 'Información básica',
                properties: [
                    { name: 'Código SAP', value: product.sap },
                    { name: 'Descripción', value: product.description },
                    { name: 'Descripción del fabricante', value: product.descriptionManufacturer },
                    { name: 'Clase', value: product.class },
                    { name: 'Categoría', value: product.category },
                    { name: 'Tipo', value: product.type },
                    { name: 'Fabricante', value: product.manufacturer },
                    { name: 'Unidad de medida', value: product.unitMeasure },
                    { name: 'Familia', value: product.family },
                    { name: 'Serie', value: product.series },
                    { name: 'Referencia', value: product.reference },
                ]
            },
            {
                title: 'Características eléctricas',
                properties: [
                    { name: 'Tipo de tensión', value: product.tensionType },
                    { name: 'Tensión mínima', value: product.minimumTension },
                    { name: 'Tensión máxima', value: product.maximumTension },
                    { name: 'Corriente de entrada', value: product.inputCurrent },
                    { name: 'Corriente de salida', value: product.outputCurrent },
                    { name: 'Potencia', value: product.power },
                    { name: 'Voltaje de potencia', value: product.powerVoltage },
                    { name: 'Caballaje', value: product.horsepower },
                    { name: 'Voltaje de caballaje', value: product.horsepowerVoltage },
                    { name: 'Frecuencia', value: product.frequency },
                ]
            },
            {
                title: 'Características mecánicas',
                properties: [
                    { name: 'Polos', value: product.poles },
                    { name: 'Tamaño', value: product.size },
                    { name: 'Alto', value: product.high },
                    { name: 'Ancho', value: product.width },
                    { name: 'Profundo', value: product.deep },
                    { name: 'Peso', value: product.weight },
                    { name: 'Montaje', value: product.mounting },
                    { name: 'Conexión', value: product.connection },
                ]
            },
            {
                title: 'Características ambientales',
                properties: [
                    { name: 'Eficiencia', value: product.efficiency },
                    { name: 'IP', value: product.ip },
                ]
            },
            {
                title: 'Características estándares',
                properties: [
                    { name: 'Norma', value: product.standard },
                    { name: 'Protocolo', value: product.protocol },
                ]
            },
            {
                title: 'Documentación',
                properties: [
                    { name: 'Aplicaciones', value: product.applications },
                    { name: 'Página', value: product.page },
                    { name: 'Web', value: product.web },
                    { name: 'Datasheet', value: product.datasheet },
                ]
            },
            {
                title: 'Descripción',
                properties: [
                    { name: 'Largo', value: product.long },
                ]
            }
        ];

        const pages = [
            {
                title: 'Ficha Técnica',
                characteristicsSections: characteristics,
                hasHeadProduct: true,
            }
        ];

        return pages;
    };

    const renderCharacteristicsSection = (section: CharacteristicsSection, isFirstPage: boolean) => {
        return (
            <View style={stylesPDF.container__Characteristics} key={section.title}>
                {isFirstPage && (
                    <View style={stylesPDF.container__Head_Product}>
                        <View style={stylesPDF.container__Image}>
                            <Image src={product.mainImage} style={stylesPDF.image__Product} />
                        </View>
                        <View style={stylesPDF.container_Title__Product}>
                            <Text style={stylesPDF.title__Product}>{product.description}</Text>
                            <Text style={stylesPDF.title__Sap_Product}>SAP: {product.sap}</Text>
                        </View>
                    </View>
                )}
                <Text style={stylesPDF.title__Characteristics}>{section.title}</Text>
                {section.properties.map((property, propIndex) => (
                    <View key={`property-${propIndex}`} style={stylesPDF.container__Propertie}>
                        <Text style={stylesPDF.title__Propertie}>{property.name}</Text>
                        <Text style={stylesPDF.value__Characteristics}>
                            {property.value !== undefined ? property.value : 'N/A'} {/* Manejar undefined */}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <Document>
            <Page size="A4" style={stylesPDF.container} wrap>
                <View style={stylesPDF.container__Head}>
                    <Text style={stylesPDF.title}>FICHA TECNICA</Text>
                    <Image src={LogoTopDrive} style={stylesPDF.logo_Top_Drive} />
                </View>
                {renderCharacteristicsSections().map((page, index) => (
                    <React.Fragment key={`page-${index}`}>
                        {page.characteristicsSections.map((section, secIndex) => (
                            renderCharacteristicsSection(section, page.hasHeadProduct && secIndex === 0)
                        ))}
                    </React.Fragment>
                ))}
                <Text style={stylesPDF.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
}

export default DownloadDataSheet;