import numpy as np
import tensorflow as tf
import cv2

def aug_shift(image_data: cv2.Mat, image_name: str, file_dir: str) -> None:
  numb_gen = 10
  # Dịch chuyển ngẫu nhiên
  my_gen = tf.keras.preprocessing.image.ImageDataGenerator(
    width_shift_range=[-2, 2],
    height_shift_range=[-2, 2])
    
  gen = my_gen.flow(image_data, batch_size=1)
  # Sinh ra 10 ảnh
  for index in range(numb_gen):
    my_batch = gen.next()
    image = my_batch[0].astype('uint8')
    image = cv2.cvtColor(image, cv2.IMREAD_GRAYSCALE)
    cv2.imwrite("{}/{}_shift_{}.png".format(file_dir, image_name, index), image)