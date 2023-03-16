import styled from 'styled-components';

export const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 70%;
  height: 70%;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-top: 40px;
`;

export const FormTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const FormButton = styled.button`
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #47b781;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

export const FormError = styled.p`
  color: red;
  margin-top: 5px;
`;
