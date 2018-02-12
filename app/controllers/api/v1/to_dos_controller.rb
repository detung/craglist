class Api::V1::ToDosController < ApiController
  def destroy
    user = current_user
    climb = Climb.find(params[:id])
    todo = ToDo.find_by(user: user, climb: climb)
    todo.destroy

    render json: user.climbs_to_do
  end
end
