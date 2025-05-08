import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Text,} from "@react-email/components";
import * as React from "react";

export const EmailTemplate = ({ body }) => {
  const { fullName, products, amount } = body;
  return (
    <Html>
      <Head />
      <Preview>Your purchase details from Abazza Tech FashionFusion</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>Hi {fullName},</Text>
          <Text style={paragraph}>
            Thank you for your purchase at Abazza Tech FashionFusion! Here are
            the details of your order:
          </Text>

          {/* List of products */}
          {products.map((product, index) => (
            <Section key={index} style={productContainer}>
              <Img
                src={product.image} // Assuming product contains imageUrl
                alt={product.title}
                style={productImage}
              />
              <div style={productDetails}>
                <Text style={productTitle}>{product.title}</Text>
                <Text style={productPrice}>Price: ${product.price}</Text>
                <Text style={productQuantity}>
                  Quantity: {product.quantity}
                </Text>
                <Button
                  pX={12}
                  pY={12}
                  style={downloadButton}
                  href={product.image} // Assuming product contains downloadUrl
                >
                  Download
                </Button>
              </div>
            </Section>
          ))}

          <Hr style={hr} />

          {/* Total amount */}
          <Text style={totalAmount}>Total Amount Paid: ${amount}</Text>

          <Hr style={hr} />

          <Text style={footer}>
            Best Regards,
            <br />
            The Abazza Tech Team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>Subscribe to Ali Abazza</Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  padding: "20px",
};

const container = {
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

const heading = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#333",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#555",
};

const productContainer = {
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #eee",
  padding: "15px 0",
};

const productImage = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "8px",
  marginRight: "15px",
};

const productDetails = {
  flexGrow: 1,
};

const productTitle = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#333",
  marginBottom: "5px",
};

const productPrice = {
  fontSize: "14px",
  color: "#777",
  marginBottom: "10px",
};

const productQuantity = {
  fontSize: "14px",
  color: "#777",
  marginBottom: "10px", // Added a margin here for space
};

const downloadButton = {
  backgroundColor: "#5F51E8",
  borderRadius: "4px",
  color: "#fff",
  textDecoration: "none",
  padding: "8px 16px",
};

const hr = {
  borderColor: "#eee",
  margin: "20px 0",
};

const totalAmount = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#333",
};

const footer = {
  fontSize: "14px",
  color: "#8898aa",
  textAlign: "center",
  marginTop: "20px",
};
