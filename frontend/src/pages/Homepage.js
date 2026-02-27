import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import Students from "../assets/students.svg";

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0} alignItems="center">
                <Grid item xs={12} md={6}>
                    <SlideInLeft>
                        <img src={Students} alt="students" style={{ width: '100%', maxHeight: '80vh' }} />
                    </SlideInLeft>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FadeInRight>
                        <StyledPaper>
                            <StyledTitle>
                                Welcome to
                                <br />
                                <GradientText>EduManage Pro</GradientText>
                            </StyledTitle>
                            <StyledText>
                                Transform your educational institution with our comprehensive management platform.
                                Effortlessly manage classes, track attendance, evaluate performance, and foster
                                seamless communication between students, teachers, and administrators.
                            </StyledText>
                            <StyledBox>
                                <StyledLink to="/choose">
                                    <ModernButton variant="contained" fullWidth>
                                        Get Started
                                    </ModernButton>
                                </StyledLink>
                                <StyledLink to="/chooseasguest">
                                    <Button variant="outlined" fullWidth
                                        sx={{
                                            mt: 2,
                                            mb: 3,
                                            color: "#2563eb",
                                            borderColor: "#2563eb",
                                            borderRadius: '10px',
                                            padding: '12px 24px',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            '&:hover': {
                                                borderColor: "#1d4ed8",
                                                backgroundColor: "rgba(37, 99, 235, 0.04)"
                                            }
                                        }}
                                    >
                                        Explore as Guest
                                    </Button>
                                </StyledLink>
                                <StyledText style={{ marginTop: 0 }}>
                                    Don't have an account?{' '}
                                    <Link to="/Adminregister" style={{
                                        color:"#2563eb",
                                        fontWeight: "600",
                                        textDecoration: "none",
                                        borderBottom: "2px solid transparent",
                                        transition: "border-color 0.2s ease",
                                    }}>
                                        Create Account
                                    </Link>
                                </StyledText>
                            </StyledBox>
                        </StyledPaper>
                    </FadeInRight>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const FadeInRight = styled.div`
  animation: ${fadeInRight} 0.6s ease forwards;
`;

const SlideInLeft = styled.div`
  animation: ${slideInLeft} 0.6s ease forwards;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8fafc;
`;

const StyledPaper = styled.div`
  padding: 32px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 0;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #1e293b;
  font-weight: 800;
  padding-top: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ModernButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    color: white;
    padding: 14px 28px;
    font-weight: 600;
    text-transform: none;
    font-size: 1.05rem;
    border-radius: 12px;
    box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
      transform: translateY(-2px);
    }
  }
`;

const StyledText = styled.p`
  color: #64748b;
  margin-top: 20px;
  margin-bottom: 20px;
  letter-spacing: normal;
  line-height: 1.6;
  font-size: 1.05rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
