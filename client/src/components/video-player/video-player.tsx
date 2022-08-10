import { useState, useEffect } from 'react';
import { Modal, Button, Group, Text } from '@mantine/core';
import { SERVER_URL } from '../../constants';
import { Movie } from '../../interfaces/interfaces';

interface VideoPlayerModalProps {
  movie: Movie | undefined;
  modalClosed: () => void;
}

const VideoPlayerModal = (props: VideoPlayerModalProps) => {

  return (
    <>
      { props.movie? 
      <video width="100%" height="auto" controls>
      <source src={`${SERVER_URL}/stream?uri=${props.movie.uri}`} type="video/mp4" />
      </video> 
      : 
      <Text size="lg" weight={500} color="dimmed">
        Click on a movie to play it
      </Text>
      }
    </>
  );
}

export default VideoPlayerModal;