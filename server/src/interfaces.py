from dataclasses import dataclass
from typing import List

@dataclass
class Movie:
    id: int
    title: str
    year: str
    rating: float
    description: str
    uri: str

@dataclass
class Serie:
    id: int
    title: str
    year: str
    rating: float
    description: str
    episodes: List[Movie]

@dataclass
class Collection:
    movies: List[Movie]
    series: List[Serie]
