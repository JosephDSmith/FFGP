import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { SnippetType } from '../types'

interface SnippetCardProps {
  snippet: SnippetType
}

const SnippetCard: React.FC<SnippetCardProps> = (props) => {
  return (
    <Card variant="outlined" sx={{ width: 320, float: 'left' }}>
      <div>
        <Typography level="title-lg">id: {props.snippet.id}</Typography>
      </div>

      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Content:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {props.snippet.content}
          </Typography>
        </div>
      </CardContent>
    </Card >
  )
}

export default SnippetCard;