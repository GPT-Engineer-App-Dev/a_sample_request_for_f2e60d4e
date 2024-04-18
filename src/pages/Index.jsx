import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, Text, VStack, useToast } from "@chakra-ui/react";
import { FaPaperPlane, FaPrint } from "react-icons/fa";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    trackingNumber: "",
    sampleInfo: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueNumber = Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = `CYKLOP-${uniqueNumber}`;
    setSubmittedData({ ...formData, uniqueNumber, trackingNumber });
    setFormData({
      name: "",
      email: "",
      trackingNumber: "",
      sampleInfo: "",
    });
    toast({
      title: "Form submitted.",
      description: `Your tracking number is ${trackingNumber}. An email has been sent to you with more details.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    // TODO: Implement email automation to send form data to samplerequest@cyklop.nl
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box bg="#002F5D" minH="100vh" p={8} color="white">
      <Text fontSize="3xl" fontWeight="bold" mb={8}>
        Sample Request Form
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} bg="white" color="black" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} bg="white" color="black" />
          </FormControl>
          <FormControl>
            <FormLabel>Tracking Number (if available)</FormLabel>
            <Input type="text" name="trackingNumber" value={formData.trackingNumber} onChange={handleChange} bg="white" color="black" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Sample Information</FormLabel>
            <Textarea name="sampleInfo" value={formData.sampleInfo} onChange={handleChange} bg="white" color="black" />
          </FormControl>
          <Button type="submit" bg="#6CB42C" _hover={{ bg: "#58941F" }} leftIcon={<FaPaperPlane />}>
            Submit
          </Button>
        </VStack>
      </form>
      {submittedData && (
        <Box mt={8} p={4} bg="white" color="black">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Submitted Data:
          </Text>
          <Text>Name: {submittedData.name}</Text>
          <Text>Email: {submittedData.email}</Text>
          <Text>Tracking Number: {submittedData.trackingNumber}</Text>
          <Text>Sample Information: {submittedData.sampleInfo}</Text>
          <Text>Unique Number: {submittedData.uniqueNumber}</Text>
          <Button mt={4} bg="#6CB42C" _hover={{ bg: "#58941F" }} leftIcon={<FaPrint />} onClick={handlePrint}>
            Print Shipping Label
          </Button>
          <Text mt={4} fontSize="sm">
            Shipping Address: Cyklop CSC Att.: SampleLab M.Slot [{submittedData.uniqueNumber}] Wilhelm Röntgenstraat 10, 8013NC, Zwolle, Nederland
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Index;
