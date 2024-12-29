import React from 'react'

export default function FoodDetail(items) {
    const { id } = useParams();
  const navigate = useNavigate();
  const dish = items.find(d => d.id === id);
  return (
    <div>{dish.name}</div>
  )
}
