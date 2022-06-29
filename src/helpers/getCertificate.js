import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const getCertificate = () => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
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
          }}
        >
          <Text>Hola que tal</Text>
          <Text>Soy el chico de las poesias</Text>
          <Text>Tu viejo admirador</Text>
          <Text>Aunque no me conocias</Text>
        </View>
      </Page>
    </Document>
  );
};

export default getCertificate;
