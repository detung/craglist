class Api::V1::CommentsController < ApiController
  def update
    comment = Comment.find(params[:id])

    if comment.update(comment_params)
      user = current_user
      todo = ToDo.find_by(user: user, climb: comment.climb)
      if todo.pending?
        render json: user.climbs_to_do
      else
        render json: user.climbs_completed
      end
    else
      render json: { error: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def completed
    comment = Comment.find(params[:commentId])

    user = current_user
    climb = Climb.find(params[:climbId])
    todo = ToDo.find_by(user: user, climb: climb)
    todo.completed!

    todo.update_attributes(completed_date: params[:tickDate])
    
    if comment.update(comment_params)
      render json: user.climbs_to_do
    else
      render json: { error: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
