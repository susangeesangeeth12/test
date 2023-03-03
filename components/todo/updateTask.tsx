"use client";

import React, { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  useDisclosure,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { updateTask } from "types/todo";

const UpdateTask = ({ task, updateTask }: updateTask) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [body, setBody] = useState("");
  const initialRef = useRef(null);
  {
  }
  return (
    <>
      <IconButton
        icon={<FiEdit />}
        isRound={true}
        onClick={onOpen}
        aria-label="edit-button"
      />
      <Modal
        isCentered
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Update your task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Enter your task"
                defaultValue={task.body}
                onChange={(e) => setBody(e.target.value)}
                onFocus={(e) => setBody(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => updateTask(task.id, body, onClose)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateTask;
