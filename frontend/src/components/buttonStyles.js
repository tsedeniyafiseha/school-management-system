import styled from 'styled-components';
import { Button } from '@mui/material';

export const RedButton = styled(Button)`
  && {
    background-color: #ef4444;
    color: white;
    margin-left: 4px;
    border-radius: 10px;
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;
    &:hover {
      background-color: #dc2626;
      box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
      transform: translateY(-1px);
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background-color: #1e293b;
    color: white;
    margin-left: 4px;
    border-radius: 10px;
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;
    &:hover {
      background-color: #0f172a;
      box-shadow: 0 4px 14px rgba(30, 41, 59, 0.35);
      transform: translateY(-1px);
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    background-color: #991b1b;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;
    &:hover {
      background-color: #b91c1c;
      box-shadow: 0 4px 14px rgba(153, 27, 27, 0.35);
      transform: translateY(-1px);
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background-color: #2563eb;
    color: #fff;
    border-radius: 10px;
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;
    &:hover {
      background-color: #1d4ed8;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
      transform: translateY(-1px);
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    background-color: #7c3aed;
    color: #fff;
    border-radius: 10px;
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;
    &:hover {
      background-color: #6d28d9;
      box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35);
      transform: translateY(-1px);
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    color: #fff;
    border-radius: 10px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
      transform: translateY(-2px);
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background-color: #10b981;
    color: #fff;
    border-radius: 10px;
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;
    &:hover {
      background-color: #059669;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
      transform: translateY(-1px);
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background-color: #78350f;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;
    &:hover {
      background-color: #92400e;
      box-shadow: 0 4px 14px rgba(120, 53, 15, 0.35);
      transform: translateY(-1px);
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    background-color: #4338ca;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;
    &:hover {
      background-color: #3730a3;
      box-shadow: 0 4px 14px rgba(67, 56, 202, 0.35);
      transform: translateY(-1px);
    }
  }
`;
