import {
  Navbar,
  Switch,
  createStyles,
  Title,
  Tooltip,
  UnstyledButton,
  Image,
  Group,
  TextInput,
  ActionIcon,
  Code,
  Badge,
  Text,
  Box,
  ScrollArea,
  NavLink,
} from "@mantine/core";
import { useState } from "react";
import { FaBeer } from "react-icons/fa";
import logo from "../../assets/logo.jpeg";
import { Movie, Collection } from "../../interfaces/interfaces";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    // Adds a small line between sections
    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },
}));

interface NavigationSidebarProps {
  collection: Collection;
  playMovie: (movie: Movie) => void;
}

const NavigationSidebar = (props: NavigationSidebarProps) => {
  const { classes, cx } = useStyles();

  const movieLinks =
    props.collection?.movies.map((movie) => (
      <NavLink
        key={movie.id}
        label={movie.title}
        onClick={() => props.playMovie(movie)}
      />
    ));

  const serieLinks = props.collection?.series.map((serie, index) => (
    <NavLink
      key={index}
      label={serie.title}
      childrenOffset={28}
    >
      {serie.episodes.map((episode, index) => 
        <NavLink
          key={index}
          label={episode.title}
          onClick={() => props.playMovie(episode)}
        />
      )}
    </NavLink>
  ));

  return (
    <Navbar height="100vh" p="md" >
      <TextInput
        placeholder="Search"
        size="xs"
        icon={<FaBeer size={12} stroke="1.5" />}
        styles={{ rightSection: { pointerEvents: "none" } }}
        mb="sm"
      />

      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader} position="apart">
          <Text size="xs" weight={500} color="dimmed">
            Series
          </Text>
        </Group>
        <div className={classes.collections}>{serieLinks}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader} position="apart">
          <Text size="xs" weight={500} color="dimmed">
            Movies
          </Text>
        </Group>
        <div className={classes.collections}>{movieLinks}</div>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavigationSidebar;
