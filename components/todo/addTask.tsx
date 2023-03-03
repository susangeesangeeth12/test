"use client";
import { QrReader } from "react-qr-reader";
import React, { useState, useEffect } from "react";
import type { SyntheticEvent } from "react";
import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import QrCodeReader, { QRCode } from "react-qrcode-reader";
import { task } from "types/todo";
import Swal from "sweetalert2";
type Props = {
  addTask: (task: task) => void;
};

const AddTask = ({ addTask }: Props) => {
  const [content, setContent] = useState("");
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [val, setVal] = React.useState<string>("");
  const [Data1, setData1] = useState("");
  let qr = { Data1 };
  const handleRead = (code: QRCode) => {
    setVal(code.data);
  };
  const [content3, setContent3] = useState("   |     Rs :  ");

  const [content4, setContent4] = useState("   |     Date :  ");
  const [inputError, setInputError] = useState(false);
  useEffect(() => {
    if (content?.trim() && inputError) {
      setInputError(false);
    }
  }, [content, content1, content2]);

  const handleSubmit = (e: SyntheticEvent) => {
    Swal.fire({
      icon: "success",
      title: "Successfully Added",
      showCancelButton: false,
      timer: 1000,
    });
    e.preventDefault();
    let taskText = [Data1, content4, content1, content3, content2];
    if (!taskText) {
      setInputError(true);

      return setContent(""), setContent1("");
    }
    const task = {
      id: uuidv4(),
      body: taskText,
      check: false,
    };
    addTask(task);
    setContent("");
    setContent1("");
    setContent2("");
    setContent3("   |    Rs :  ");

    setContent4("   |    Date :  ");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {" "}
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData1(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will
          // open the front camera
          constraints={{ facingMode: "environment" }}
          // style={{ width: "30%", height: "30%" }}
        />
      </div>
      <p>Name</p>
      <Input
        type="text"
        h="46"
        borderColor={inputError ? "red.300" : "transparent"}
        variant="filled"
        placeholder="Name"
        value={Data1}
        required
        onChange={(e) => setContent(e.target.value)}
      />
      <p>Date</p>
      <Input
        type="date"
        h="46"
        borderColor={inputError ? "red.300" : "transparent"}
        variant="filled"
        placeholder="Date"
        value={content1}
        required
        onChange={(e) => setContent1(e.target.value)}
      />
      <p>Rs</p>
      <Input
        type="number"
        h="46"
        borderColor={inputError ? "red.300" : "transparent"}
        variant="filled"
        placeholder="Rs"
        value={content2}
        required
        onChange={(e) => setContent2(e.target.value)}
      />
      <Button
        colorScheme="twitter"
        px="8"
        pl="10"
        pr="10"
        h="46"
        mt="4"
        mb="4"
        type="submit"
      >
        Add
      </Button>
    </form>
  );
};
export default AddTask;
