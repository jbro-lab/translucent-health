import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';

const StarRanking = ({ ranking }) => {
  const filledStars = Math.floor(ranking);
  const remainingStars = 5 - filledStars;
  const hasHalfStar = ranking - filledStars >= 0.5;

  if (ranking === 0) {
    return <Typography variant="body1">No ratings yet</Typography>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ mr: 1 }}>
        {[...Array(filledStars)].map((_, i) => (
          <StarIcon key={i} sx={{ color: '#FFB400' }} />
        ))}
        {hasHalfStar && <StarHalfIcon sx={{ color: '#FFB400' }} />}
        {[...Array(remainingStars)].map((_, i) => (
          <StarBorderIcon key={i} sx={{ color: '#DADADA' }} />
        ))}
      </Typography>
      {/* <Typography sx={{ fontSize: '0.75rem', fontStyle: 'italic' }}>
        ***Star ranking based on Medicare overall ranking
      </Typography> */}
    </div>
  );
};

export default StarRanking;

