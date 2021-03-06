class Api::V1::ClimbsController < ApiController
  def create
    if current_user.nil?
      redirect_to new_user_session_path
    else
      user = current_user
      climb = Climb.new(climb_params)
      if climb.save!
        user.climbs << climb
        comment = Comment.new(comment_params)
        comment.user = current_user
        comment.climb = climb
        if comment.save!
          render json: user.climbs_to_do
        else
          render json: { error: comment.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: climb.errors.full_messages }, status: :unprocessable_entity
      end
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

  def home_todos
    if current_user.nil?
      redirect_to new_user_session_path
    else
      user = current_user
      to_do_list = user.climbs_to_do.take(5)

      render json: to_do_list
    end
  end

  def home_ticks
    if current_user.nil?
      redirect_to new_user_session_path
    else
      user = current_user
      tick_list = user.climbs_completed.reverse.take(5)

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

    avg_num_starVotes = routes.inject(0) { |sum, route| sum + route["starVotes"] } / routes.size
    avg_stars = routes.inject(0.0) { |sum, route| sum + route["stars"] } / routes.size
    
    routes.each do |route|
      this_num_starVotes = route["starVotes"]
      this_stars = route["stars"]
      bayesian_rating = ( (avg_num_starVotes * avg_stars) + (this_num_starVotes * this_stars) ) / (avg_num_starVotes + this_num_starVotes)

      route["bayesian_rating"] = bayesian_rating
    end

    sorted_routes = routes.sort_by { |route| route["bayesian_rating"] }.reverse
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
