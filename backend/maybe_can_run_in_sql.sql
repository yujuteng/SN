SELECT DISTINCT s_in.name AS sname, 
		Move.station2 AS mrt, 
		mrt_l.cname AS mrtLine, 
		(CASE WHEN COALESCE((SELECT l1.line
						   FROM   mrt."MRT_Station" AS l1, mrt."MRT_Station" AS l2
						   WHERE  l1.line = l2.line AND l1.name = s1.name AND l2.name = s2.name
						   LIMIT  1),'') = '' 
		then true else false end) AS transfer,
		Move.time + s_loc.distance/60  AS time,
		Move.fare AS fare,
/*		s_in.pic_url AS picureURL,
		s_in.website_url AS websiteURL,
		s_in.descrip AS descrip,
		s_in.addr AS addr,
		s_in.open_Time AS openTime,*/
		s_tag.tag AS tag,
		A.aqi AS aqi,
		A.status AS aqiDescrip,
		W.temp AS temp,
		W.weather AS weather
FROM   mrt."MRT_Move" AS Move
join   mrt."MRT_Station" AS s1 on Move.station1 = s1.name
join   mrt."MRT_Station" AS s2 on Move.station2 = s2.name
left join mrt."MRT_Position" AS mrt_pos on Move.station2 = mrt_pos.name
left join mrt."MRT_Line" AS mrt_l on s2.line = mrt_l.ename
left join air_wea.air AS A on mrt_pos.near_s_air = A.sid
left join air_wea.weather AS W on mrt_pos.near_s_weather = W.sid
left join spot.spot_locate AS s_loc ON mrt_pos.name = s_loc.mrt
left join spot.spot_info AS s_in ON s_loc.sid = s_in.sid
left join spot.spot_tag AS s_tag ON s_in.sid = s_tag.sid
WHERE  Move.station1 = '中正紀念堂' 
		AND (Move.time + s_loc.Distance/60) <= 15
		AND (true or (CASE WHEN COALESCE((SELECT l1.line
										FROM   mrt."MRT_Station" AS l1, mrt."MRT_Station" AS l2
										WHERE  l1.line = l2.line AND l1.name = s1.name AND l2.name = s2.name AND l1.name = '中正紀念堂'
										LIMIT  1),'') = '' 
					  then false else true end))
		/*AND s_tag.tag = '藝術'*/
		AND s_tag.sid IN (SELECT t.sid
						  FROM spot.spot_tag AS t
						  WHERE t.tag = '藝術' AND s_in.sid = t.sid )
ORDER BY sname