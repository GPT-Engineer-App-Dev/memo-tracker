import { useState } from 'react';
import { Box, Container, Input, Button, SimpleGrid, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea, Text } from '@chakra-ui/react';

const Note = ({ note, onEdit, onDelete }) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="lg">
      <Text mb={4}>{note.content}</Text>
      <Button colorScheme="blue" mr={3} onClick={() => onEdit(note)}>
        Edit
      </Button>
      <Button colorScheme="red" onClick={() => onDelete(note.id)}>
        Delete
      </Button>
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddNote = () => {
    setCurrentNote({ id: Date.now(), content: '' });
    onOpen();
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    onOpen();
  };

  const handleSaveNote = () => {
    if (currentNote.id) {
      setNotes(notes.map(note => note.id === currentNote.id ? currentNote : note));
    } else {
      setNotes([...notes, currentNote]);
    }
    onClose();
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Container maxW="container.xl" p={5}>
      <Button onClick={handleAddNote} colorScheme="teal" mb={4}>
        Add Note
      </Button>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
        {notes.map(note => (
          <Note key={note.id} note={note} onEdit={handleEditNote} onDelete={handleDeleteNote} />
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentNote?.id ? 'Edit Note' : 'New Note'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea value={currentNote?.content} onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveNote}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;