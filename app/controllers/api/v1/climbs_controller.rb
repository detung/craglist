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
      else
        render json: { error: climb.errors.full_messages }, status: :unprocessable_entity
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

  def search
    location = location_params
    coordinates = Geokit::Geocoders::GoogleGeocoder.geocode location
    latitude = coordinates.latitude
    longitude = coordinates.longitude

    distance = params[:radius]
    type = params[:type]
    minDiff = params[:minGrade]
    maxDiff = params[:maxGrade]

    response = HTTParty.get("https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=#{latitude}&lon=#{longitude}&maxResults=100&maxDistance=#{distance}&minDiff=#{minDiff}&maxDiff=#{maxDiff}&key=#{ENV['MP_API_KEY']}")
    routes = response["routes"]
    routes.select! { |route| route["type"] == type }
    sorted_routes = routes.sort_by { |route| route["stars"] }.reverse
    top_ten_routes = sorted_routes.take(10)

    render json: top_ten_routes
  end

  private

  def climb_params
    params.require(:climb).permit(:name, :location, :grade, :discipline, :pitches)
  end

  def comment_params
    params.require(:comment).permit(:body)
  end

  def location_params
    params.require(:q)
  end
end
