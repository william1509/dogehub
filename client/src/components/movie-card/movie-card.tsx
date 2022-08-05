import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import { Movie } from '../../interfaces/interfaces';

interface MovieCardProps {
    movie: Movie;
    playMovie: (movie: Movie) => void;
}

const MovieCard = (props: MovieCardProps) => {
  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
  ? theme.colors.dark[1]
  : theme.colors.gray[7];

  return (
    <div style={{ width: 340, marginTop: 10 }}>
      <Card shadow="sm" p="lg" >
        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{props.movie.title}</Text>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {props.movie.description}
        </Text>

        <Button variant="outline" color="teal" fullWidth style={{ marginTop: 14 }} onClick={() => props.playMovie(props.movie)}>
          Watch
        </Button>
      </Card>
    </div>
  )
}

export default MovieCard;