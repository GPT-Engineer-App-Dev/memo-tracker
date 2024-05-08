import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { FaPlus, FaSearch } from 'react-icons/fa';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <Box p={4} bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="lg">
      <Text mb={2}>{note.content}</Text>
      <Flex justifyContent="space-between">
        <Button size="sm" onClick={() => onEdit(note)}>Edit</Button>
        <Button size="sm" colorScheme="red" onClick={() => onDelete(note.id)}>Delete</Button>
      </Flex>
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  const addNote = () => {
    if (input.trim()) {
      const newNote = { id: Date.now(), content: input };
      setNotes([...notes, newNote]);
      setInput('');
    }
  };

  const editNote = (updatedNote) => {
    const updatedNotes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter(note => note.id !== id);
    setNotes(filteredNotes);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Flex w="full" justifyContent="space-between">
          <Input
            placeholder="Add a new note..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNote()}
          />
          <Button leftIcon={<FaPlus />} onClick={addNote} ml={2}>
            Add
          </Button>
        </Flex>
        <Input placeholder="Search notes..." leftIcon={<FaSearch />} />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={editNote}
              onDelete={deleteNote}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;