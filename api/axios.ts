import { Category, Difficulty, Question } from "@/types/common";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://opentdb.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCategories: () => Promise<Category[]> = () =>
  axiosInstance
    .get("api_category.php")
    .then((res) => res.data.trivia_categories);

export const getQuestions: (
  category: string,
  difficulty: Difficulty
) => Promise<Question[]> = (category, difficulty) =>
  axiosInstance
    .get(`api.php?amount=10&category=${category}&difficulty=${difficulty}`)
    .then((res) => res.data.results);
