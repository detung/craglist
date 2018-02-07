class Api::V1::ClimbsController < ApiController

  def create
    climb = Climb.new(climb_params)

    if climb.save
      # flash[:notice] = "Route Added Successfully"
      render json: Climb.all
    end
  end

  def todo
    
  end

  private

  def climb_params
    params.require(:climb).permit(:name, :location, :grade, :discipline, :pitches, :description, :comment)
  end
end
