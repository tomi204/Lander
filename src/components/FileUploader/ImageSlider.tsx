import FormItem from "@/app/add-listing/FormItem";
import Input from "@/shared/Input";
import React from "react";
import styled from "styled-components";

interface ImageSliderProps {
  images: { file: File; preview: string; description: string }[];
  validationError: boolean;
  onDescriptionChange: (index: number, value: string) => void;
  onDelete: (index: number) => void;
}

const ImageContainer = styled.div`
  padding-top: 10px;
  display: flex;
  overflow-x: auto;
  gap: 10px;
`;

const Card = styled.div`
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; // Agregado para permitir el posicionamiento absoluto del botón de eliminar
`;

const Image = styled.img`
  width: 100%;
  min-width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: white;
  border: solid 1px gray;
  border-radius: 50px;
  cursor: pointer;
`;

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  validationError = false,
  onDescriptionChange,
  onDelete,
}) => {
  return (
    <ImageContainer>
      {images.map((image, index) => (
        <Card key={index}>
          <Image src={image.preview} alt={`Preview ${index}`} />
          <FormItem label="Description">
            <Input
              type="text"
              placeholder="..."
              value={image.description}
              onChange={(e) => onDescriptionChange(index, e.target.value)}
              className={`border ${validationError ? "border-red-500" : ""}`} // Cambia el color del borde a rojo si hay un error de validación
            />
          </FormItem>
          <DeleteButton onClick={() => onDelete(index)}>X</DeleteButton>
        </Card>
      ))}
    </ImageContainer>
  );
};

export default ImageSlider;
