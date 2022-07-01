import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import stamp from "../../assets/sello-vacunAssist.png";

export const GetCertificate = (data, user) => {
  const [vaccine, setVaccine] = useState("");
  const [usr, setUsr] = useState("");
  const currentDate = new Date().toISOString().split("T", 1);
  const [birthdayDate, setBirthdayDate] = useState("");
  const [vaccinationDate, setVaccinationDate] = useState("");
  useEffect(() => {
    if (data) {
      setVaccine(data);
      setUsr(user);
      setBirthdayDate(...user.birthday.split("T", 1));
      setVaccinationDate(data.vaccinationDate.split("T", 1));
    }
  }, [data]);

  console.log(vaccine);
  console.log(usr);
  console.log(birthdayDate);
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
            paddingBottom: "10px",
            paddingLeft: "10px",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              paddingRight: "240px",
              paddingLeft: "50px",
              paddingLeft: "10px",
              borderRightWidth: "2px",
              borderRightStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "14px" }}>Certificase que (Nombre)</Text>
            <Text style={{ fontSize: "12px", padding: "10px" }}>
              This is to certify that
            </Text>
            <Text style={{ fontSize: "14px" }}>{usr.fullName}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              paddingRight: "150px",
            }}
          >
            <Text style={{ fontSize: "14px" }}>Nacido (a) el</Text>
            <Text style={{ fontSize: "12px", padding: "10px" }}>
              Date of birth
            </Text>
            <Text style={{ fontSize: "14px" }}>{birthdayDate}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "left",
            backgroundColor: "white",
            paddingBottom: "10px",
            paddingLeft: "10px",
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
              paddingRight: "180px",
            }}
          >
            <Text style={{ fontSize: "14px" }}>
              Documento de identificacion N°
            </Text>
            <Text style={{ fontSize: "12px", padding: "10px" }}>
              Travel document N°
            </Text>
            <Text style={{ fontSize: "14px" }}>{vaccine.patientDni}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            paddingLeft: "50px",
            paddingBottom: "10px",
            borderTopWidth: "1px",
            borderTopStyle: "solid",
          }}
        >
          <Text style={{ fontSize: "14px" }}>
            En la fecha indicada ha sido vacunado (a) o ha recibido tratamiento
            profilactico contra (Nombre de la enfermedad)
          </Text>
          <Text style={{ fontSize: "12px", padding: "10px" }}>
            Has on the date indicated been vaccined or recivd prophylaxis (name
            of disease or condition)
          </Text>
          <Text style={{ fontSize: "14px" }}>{vaccine.vaccine}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
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
              width: "15%",
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
              width: "15%",
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
              width: "15%",
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
              width: "15%",
            }}
          >
            <Text style={{ fontSize: "12px" }}>{vaccinationDate}</Text>
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
            <Text style={{ fontSize: "12px" }}>{vaccine.vaccunator}</Text>
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
            <Text style={{ fontSize: "12px" }}>Marca: {vaccine.mark}</Text>
            <Text style={{ fontSize: "12px" }}>Lote: {vaccine.lot}</Text>
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
            <Text style={{ fontSize: "12px" }}>{currentDate}</Text>
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
              alignItems: "center",
            }}
          >
            <Image
              src={stamp}
              style={{ maxWidth: "120px", maxheigh: "120px" }}
            ></Image>
          </View>
        </View>
      </Page>
    </Document>
  );
};
