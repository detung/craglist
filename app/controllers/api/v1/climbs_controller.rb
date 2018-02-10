class Api::V1::ClimbsController < ApiController

  def create
    # if current_user.nil?
    #   redirect_to new_user_session_path
    # else
      # user = current_user
      user = User.first
      climb = Climb.new(climb_params)

      if climb.save!
        user.climbs << climb
        render json: user.climbs_to_do
      end
    # end
  end

  def todos
    # if current_user.nil?
    #   redirect_to new_user_session_path
    # else
      # user = current_user
      user = User.first
      to_do_list = user.climbs_to_do
      render json: to_do_list
    # end
  end

  def ticks
    # if current_user.nil?
    #   redirect_to new_user_session_path
    # else
      # user = current_user
      user = User.first
      tick_list = user.climbs_completed.reverse
      render json: tick_list
    # end
  end

  private

  def climb_params
    params.require(:climb).permit(:name, :location, :grade, :discipline, :pitches, :description, :comment)
  end
end
