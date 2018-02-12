class Api::V1::ClimbsController < ApiController

  def create
    if current_user.nil?
      redirect_to new_user_session_path
    else
      user = current_user
      new_climb = Climb.new(climb_params)
      new_comment = Comment.new(comment_params)
      new_comment.user = current_user
      new_comment.climb = new_climb

      if new_climb.save!
        user.climbs << new_climb
      end

      new_comment.save!

      render json: user.climbs_to_do
    end
  end

  def todos
    if current_user.nil?
      redirect_to new_user_session_path
    else
      user = current_user
      to_do_list = user.climbs_to_do

      render json: to_do_list
    end
  end

  def ticks
    if current_user.nil?
      redirect_to new_user_session_path
    else
      user = current_user
      tick_list = user.climbs_completed.reverse

      render json: tick_list
    end
  end

  private

  def climb_params
    params.require(:climb).permit(:name, :location, :grade, :discipline, :pitches, :description)
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
