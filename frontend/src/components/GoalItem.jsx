import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function GoalItem({goal}) {
    const dispatch = useDispatch();

  return (
    <div className="goal">
        <div>
            {new Date(goal.createdAt).toLocaleDateString('en-us')}
        </div>
        <h2
        style={{
          width: "100%",
          whiteSpace: "wrap",
        }}
        >{goal.text}</h2>
        <button className="close"
        onClick={()=>dispatch(deleteGoal(goal._id))}>

        X</button>
    </div>
  )
}

export default GoalItem