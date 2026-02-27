import { Container, Grid, Paper, Box } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled, { keyframes } from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser.id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    const cardData = [
        { icon: Students, title: 'Total Students', value: numberOfStudents, color: '#2563eb', gradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' },
        { icon: Classes, title: 'Total Classes', value: numberOfClasses, color: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)' },
        { icon: Teachers, title: 'Total Teachers', value: numberOfTeachers, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' },
        { icon: Fees, title: 'Fees Collection', value: 23000, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', prefix: '$' },
    ];

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {cardData.map((card, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <StyledPaper $delay={index * 0.1}>
                                <IconCircle style={{ background: card.gradient }}>
                                    <img src={card.icon} alt={card.title} style={{ width: 32, height: 32, filter: 'brightness(0) invert(1)' }} />
                                </IconCircle>
                                <Title>{card.title}</Title>
                                <Data start={0} end={card.value} duration={2.5} prefix={card.prefix || ''} $color={card.color} />
                            </StyledPaper>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', borderRadius: 4, border: '1px solid rgba(0,0,0,0.04)' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledPaper = styled(Paper)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: 16px !important;
  border: 1px solid rgba(0,0,0,0.04) !important;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$delay || 0}s;
  opacity: 0;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important;
  }
`;

const IconCircle = styled(Box)`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const Title = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  margin: 0;
`;

const Data = styled(CountUp)`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.$color || '#1e293b'};
`;

export default AdminHomePage
