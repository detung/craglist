class Api::V1::ClimbsController < ApiController

  def create
    climb = Climb.new(climb_params)
    user = User.first
    to_do_list = user.to_do
    climb.to_do = to_do_list
    if climb.save!
      # flash[:notice] = "Route Added Successfully"
      render json: Climb.all
    end
  end

  def todo
    user = User.first
    to_do_list = user.to_do
    to_do_list = to_do_list.climbs
    render json: to_do_list
  end

  private

  def climb_params
    params.require(:climb).permit(:name, :location, :grade, :discipline, :pitches, :description, :comment)
  end
end
