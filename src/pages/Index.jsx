import { useState } from 'react';
import { Box, Container, Input, Button, SimpleGrid, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea, Select } from '@chakra-ui/react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="lg">
      <Textarea value={note.content} onChange={(e) => onEdit(note.id, e.target.value)} />
      <Select placeholder="Select color" value={note.color} onChange={(e) => onEdit(note.id, note.content, e.target.value)}>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </Select>
      <Button colorScheme="red" onClick={() => onDelete(note.id)}>Delete</Button>
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddNote = () => {
    const newId = notes.length + 1;
    setNotes([...notes, { id: newId, content: newNote, color: 'blue' }]);
    setNewNote('');
    onClose();
  };

  const handleEditNote = (id, content, color = 'blue') => {
    const updatedNotes = notes.map(note => note.id === id ? { ...note, content, color } : note);
    setNotes(updatedNotes);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Container maxW="container.xl" p={5}>
      <Button onClick={onOpen} colorScheme="teal" mb={4}>Add Note</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea placeholder="Type here..." value={newNote} onChange={(e) => setNewNote(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddNote}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onEdit={handleEditNote} onDelete={handleDeleteNote} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;