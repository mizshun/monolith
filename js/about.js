var MONOLITH = MONOLITH || {};

jQuery(function ($, MONOLITH, d3) {

  'use strict';

  var ML      = MONOLITH,
      d3      = d3,
      $window = ML.DOM.$window;

  // ===================================
  // GRAPH DATA
  // ===================================
  ML.DATA = ML.DATA || {};

  // 現在のスキルデータ
  var abilityData = ML.DATA.abilityData = [
        {
          name: "HTML+CSS",
          size: 100
        },
        {
          name: "Design",
          size: 70
        },
        {
          name: "jQuery",
          size: 70
        },
        {
          name: "JavaScript",
          size: 60
        },
        {
          name: "WordPress",
          size: 45
        },
        {
          name: "PHP",
          size: 20
        }
      ],

      // 現在の取り組みデータ
      effortsData = ML.DATA.effortsData = {
        children: [
          {
            name: "HTML5",
            size: 80
          },
          {
            name: "CSS3,4",
            size: 80
          },
          {
            name: "JavaScript",
            size: 90
          },
          {
            name: "UI+UX",
            size: 60
          },
          {
            name: "WordPress",
            size: 80
          },
          {
            name: "jQuery",
            size: 60
          },
          {
            name: "Design",
            size: 80
          },
          {
            name: "PHP",
            size: 60
          }
        ]
      };

  // ===================================
  // METHODS
  // ===================================
  /**
   * パイチャートを作成する
   */
  (function () {
    // 設定
    var localX = 324,
        localY = 384,
        innerR = 160;

    var pieChart      = d3.select("#pie-chart"),
        pieChartInner = pieChart.append("g")
          .attr({
            "id": "pie-chart-inner"
          });

    var pie = d3.layout.pie()
          .startAngle(-Math.PI / 2)
          .endAngle(Math.PI / 2)
          .value(function(d){ return d.size; });

    var arc = d3.svg.arc().innerRadius(innerR).outerRadius(localX);

    pieChartInner.selectAll("path")
      .data(pie(abilityData))
      .enter()
      .append("path")
      .attr({
        "d"           : arc,
        "fill"        : function (d,i) { return "hsl(" + (72 + (i * -8)) + ", 88%, 56%)"; },
        "stroke"      : "#fff",
        "stroke-width": 1,
        "transform"   : "translate(" + localX + "," + localY + ")"
      });

    pieChartInner.selectAll("text")
      .data(pie(abilityData))
      .enter()
      .append("text")
      .attr({
        "transform": function(d) {
          var points = arc.centroid(d),
              x      = points[0] + localX,
              y      = points[1] + localY;
          return "translate(" + x + "," + y + ")";
        },
        "text-anchor"   : "middle",
        "font-family"   : "'DigitaldreamFatNarrowRegular', sans-serif",
        "font-size"     : "18px",
        "letter-spacing": "0.1em"
      })
      .text(function(d) {
        return d.data.name;
      });
    }()),

    /**
   * ツリーマップを作成する
   */
  (function () {
    // 設定
    var localX = 18,
        localY = 768;

    var treeMap = d3.select("#tree-map")
          .attr({
            "shape-rendering": "crispEdges"
          });

    var treemap = d3.layout.treemap()
          .size([610, 290])
          .value(function(d){ return d.size; });

    var nodes = treemap.nodes(effortsData);

    treeMap.selectAll("rect")
      .data(nodes)
      .enter()
      .append("rect")
      .attr({
        "x"     : function (d) { return d.x; },
        "y"     : function (d) { return d.y; },
        "width" : function (d) { return d.dx; },
        "height": function (d) { return d.dy; },
        "fill"  : function (d,i) { return "hsl(" + (197 + (i * -12)) + ", 29%, 81%)"; },
        "stroke": "#fff",
        "stroke-width": 8,
        "transform"   : "translate(" + localX + "," + localY + ")"
      });

    treeMap.selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr({
        "class"    : function (d, i) {
          return "efforts-" + i;
        },
        // テキストの重なり
        // "y": function (d) {
        //   if (d.name === "JavaScript") {
        //     return 36;
        //   }
        // },
        "transform": function (d) {
          var x = d.x + (d.dx / 2) + localX,
              y = d.y + (d.dy / 2) + localY;
          return "translate(" + x + "," + y + ")";
        },
        "text-anchor"   : "middle",
        "font-family"   : "'DigitaldreamFatNarrowRegular', sans-serif",
        "font-size"     : "18px",
        "letter-spacing": "0.1em"
      })
      .text(function(d) {
        return d.name;
      });
    }()),

    /**
     * SafariだとSVGのheightの取り方が違うみたいなので強制的に高さを指定する
     */
    (function () {
      // 描画域 高さ調整
        var ratio   = 2.509, // height / width
            $parent = $('svg').parent();
        $(window).on('load resize', function () {
          var w = $parent.width(),
              h = w * ratio;
          $parent.height(Math.floor(h));
        });
    }());
    window.console.log(ML);
}(jQuery, MONOLITH, d3));
