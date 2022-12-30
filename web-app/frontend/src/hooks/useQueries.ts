import { useQuery } from "react-query";
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 2000,
  headers: {
    'Cache-Control': 'no-cache'
  }
})

export const usePredictDigitsPOST = async (imageBase64Encode: string) => {
  const formData = new FormData()
  formData.append("image_name", "image_predict.png")
  formData.append("image_base64_encode", imageBase64Encode)

  const { data } = await AxiosInstance
    .post("predict_digits", formData)
  return data;
}

export const usePredictCharactersPOST = async (imageBase64Encode: string) => {
  const formData = new FormData()
  formData.append("image_name", "image_predict.png")
  formData.append("image_base64_encode", imageBase64Encode)

  const { data } = await AxiosInstance
    .post("predict_characters", formData)
  return data;
}