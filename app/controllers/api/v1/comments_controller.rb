class Api::V1::CommentsController < ApiController
  def update
    comment = Comment.find(params[:id])

    if comment.update(comment_params)
      user = current_user
      render json: user.climbs_to_do
    else
      render json: { error: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
