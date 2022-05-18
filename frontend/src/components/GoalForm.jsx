import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

function GoalForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="goal">Goal</label>
          <input
            type="text"
            id="text"
            name="text"
            value={text}
            placeholder="Enter your goal"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-block">
                Add Goal
            </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
