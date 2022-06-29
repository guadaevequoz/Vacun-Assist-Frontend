import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

export const getCertificate = () => {
  return (
    <Document>
      <Page size="A4" orientation="landscape">
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: "20px" }}>
            CERTIFICADO INTERNACIONAL DE VACUNACION O PROFILAXIS
          </Text>
          <Text style={{ fontSize: "16px" }}>
            INTERNATIONAL CERTIFICATE OF VACCINATION OR PROPHYLAXIS
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "left",
            backgroundColor: "white",
            padding: 10,
            paddingBottom: "20px",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              padding: 10,
              paddingRight: "240px",
              paddingLeft: "50px",
              borderRightWidth: "2px",
              borderRightStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "14px" }}>Certificase que (Nombre)</Text>
            <Text style={{ fontSize: "12px" }}>This is to certify that</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              padding: 10,
              paddingRight: "150px",
              borderRightWidth: "2px",
              borderRightStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "14px" }}>Nacido (a) el</Text>
            <Text style={{ fontSize: "12px" }}>Date of birth</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              padding: 10,
              paddingRight: "100px",
            }}
          >
            <Text style={{ fontSize: "14px" }}>Sexo</Text>
            <Text style={{ fontSize: "12px" }}>Sex</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "left",
            backgroundColor: "white",
            padding: 10,
            paddingBottom: "30px",
            borderTopWidth: "1px",
            borderTopStyle: "solid",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              padding: 10,
              paddingRight: "180px",
              paddingLeft: "50px",
              borderRightWidth: "2px",
              borderRightStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "14px" }}>Nacionalidad</Text>
            <Text style={{ fontSize: "12px" }}>Nationality</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              padding: 10,
              paddingRight: "180px",
              borderRightWidth: "2px",
              borderRightStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "14px" }}>
              Documento de identificacion N°
            </Text>
            <Text style={{ fontSize: "12px" }}>Travel document N°</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              padding: 10,
              paddingRight: "100px",
            }}
          >
            <Text style={{ fontSize: "14px" }}>
              Cuya firma aparece a continuacion
            </Text>
            <Text style={{ fontSize: "12px" }}>Whose signature follows</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: 10,
            paddingLeft: "50px",
            paddingBottom: "35px",
            borderTopWidth: "1px",
            borderTopStyle: "solid",
          }}
        >
          <Text style={{ fontSize: "14px" }}>
            En la fecha indicada ha sido vacunado (a) o ha recibido tratamiento
            profilactico contra (Nombre de la enfermedad)
          </Text>
          <Text style={{ fontSize: "12px" }}>
            Has on the date indicated been vaccined or recivd prophylaxis (name
            of disease or condition)
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: 10,
            paddingLeft: "50px",
            borderTopWidth: "1px",
            borderTopStyle: "solid",
          }}
        >
          <Text style={{ fontSize: "14px" }}>
            De conformidad con el Reglamento Sanitario Internacional
          </Text>
          <Text style={{ fontSize: "12px" }}>
            In accordance with the International Health Regulations
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            paddingBottom: 0,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              width: "20%",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "12px" }}>VACUNA O</Text>
            <Text style={{ fontSize: "12px" }}>PROFILAXIS</Text>
            <Text style={{ fontSize: "10px" }}>VACCINE OR</Text>
            <Text style={{ fontSize: "10px" }}>PROPHYLAXIS</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              borderWidth: "1px",
              borderStyle: "solid",
              width: "10%",
            }}
          >
            <Text style={{ fontSize: "12px" }}>FECHA</Text>
            <Text style={{ fontSize: "10px" }}>DATE</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              width: "21%",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "12px" }}>
              NOMBRE Y APELLIDO DEL VACUNADOR
            </Text>
            <Text style={{ fontSize: "10px" }}>
              NAME AND SURNAME OF VACCINATOR
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              width: "24%",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "12px" }}>FABRICANTE DE LA</Text>
            <Text style={{ fontSize: "12px" }}>VACUNA O PRODUCTO</Text>
            <Text style={{ fontSize: "12px" }}>PROFILACTICO Y N° DE LOTE</Text>
            <Text style={{ fontSize: "10px" }}>
              MANUFACTURER AND BATCH N° OF VACCINE
            </Text>
            <Text style={{ fontSize: "10px" }}>OR PROPHYLAXIS</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              width: "24%",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "12px" }}>VALIDEZ DEL</Text>
            <Text style={{ fontSize: "12px" }}>CERTIFICADO DESDE</Text>
            <Text style={{ fontSize: "10px" }}>CERTIFICATE VALID FROM</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              width: "22%",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "12px" }}>CENTRO OFICIAL DEL CENTRO</Text>
            <Text style={{ fontSize: "12px" }}>ADMINISTRADOR</Text>
            <Text style={{ fontSize: "10px" }}>OFICIAL STAMP OF</Text>
            <Text style={{ fontSize: "10px" }}>VACCINATION CENTER</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            paddingTop: 0,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              width: "20%",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "12px" }}>1.</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              borderWidth: "1px",
              borderStyle: "solid",
              width: "10%",
            }}
          >
            <Text style={{ fontSize: "12px" }}>(Inserte Fecha)</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              width: "21%",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "12px" }}>(Inserte NomyAp Vacc)</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              width: "24%",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "12px" }}>(Inserte Lote y Marca)</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              width: "24%",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "12px" }}>(Inserte fecha actual)</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 10,
              width: "22%",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "12px" }}>
              (Inserte sello VacunAssist)
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
