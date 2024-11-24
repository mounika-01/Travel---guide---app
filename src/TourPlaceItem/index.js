import {
  TourPlaceItemContainer,
  PlaceImg,
  DescriptionContainer,
  TourItemHeading,
  Description,
} from './style'

const TourPlaceItem = props => {
  const {tourPlaceDetails} = props
  const {description, imageUrl, name} = tourPlaceDetails

  return (
    <TourPlaceItemContainer>
      <PlaceImg src={imageUrl} alt={name} />
      <DescriptionContainer>
        <TourItemHeading>{name}</TourItemHeading>
        <Description>{description}</Description>
      </DescriptionContainer>
    </TourPlaceItemContainer>
  )
}

export default TourPlaceItem