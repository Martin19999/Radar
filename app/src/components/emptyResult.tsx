import { Card, CardHeader, CardBody, Stack } from '@chakra-ui/react';

const EmptyResult: React.FC = () =>{
  return(
    <Card variant='outline'>
      <Stack>
        <CardHeader>
          <h2>Hmmm... It's pretty empty out here :)</h2>
        </CardHeader>
        {/* <CardBody>
          
          <p>Maybe try to search for another keyword?</p>
        </CardBody> */}
      </Stack>
      
      
    </Card>
  )
};

export default EmptyResult;